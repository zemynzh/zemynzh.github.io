# TypeScript 高级类型技巧

TypeScript 的类型系统非常强大，通过条件类型、映射类型等高级特性，我们可以构建出更加精确的类型定义。本文将深入探讨这些高级类型技巧，并通过实际案例展示它们的应用。

## 条件类型 (Conditional Types)

条件类型是 TypeScript 中最强大的类型特性之一，它允许我们根据输入类型动态选择输出类型。

### 基本语法

```typescript
T extends U ? X : Y
```

这个语法表示：如果类型 T 可以赋值给类型 U，则返回类型 X，否则返回类型 Y。

### 实际应用示例

```typescript
// 检查类型是否为数组
type IsArray<T> = T extends Array<any> ? true : false;

type Test1 = IsArray<string[]>;        // true
type Test2 = IsArray<string>;          // false
type Test3 = IsArray<number[]>;        // true

// 提取数组元素类型
type ArrayElement<T> = T extends Array<infer U> ? U : never;

type Test4 = ArrayElement<string[]>;   // string
type Test5 = ArrayElement<number[]>;   // number
type Test6 = ArrayElement<boolean>;    // never
```

### 分布式条件类型

当条件类型作用于联合类型时，它会分布到每个联合成员上：

```typescript
type ToArray<T> = T extends any ? T[] : never;

type Test7 = ToArray<string | number>; // string[] | number[]
```

## 映射类型 (Mapped Types)

映射类型允许我们从一个现有类型创建新类型，通过遍历现有类型的属性。

### 基本映射类型

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### 自定义映射类型

```typescript
// 将所有属性转换为函数
type ToFunction<T> = {
  [P in keyof T]: (value: T[P]) => void;
};

interface User {
  name: string;
  age: number;
  email: string;
}

type UserFunctions = ToFunction<User>;
// 等价于：
// {
//   name: (value: string) => void;
//   age: (value: number) => void;
//   email: (value: string) => void;
// }
```

## 模板字面量类型 (Template Literal Types)

TypeScript 4.1 引入了模板字面量类型，允许我们基于字符串字面量创建类型。

### 基本用法

```typescript
type EventName = 'click' | 'scroll' | 'mousemove';
type EventHandler = `on${EventName}`;

// 等价于：
// type EventHandler = 'onclick' | 'onscroll' | 'onmousemove';
```

### 高级用法

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = `/api/${string}`;
type FullUrl = `${HttpMethod} ${ApiEndpoint}`;

// 示例：
type ValidUrl = 'GET /api/users' | 'POST /api/users' | 'PUT /api/users/1';
```

## 实用工具类型

### 条件类型与工具类型结合

```typescript
// 提取函数参数类型
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 提取 Promise 的解析类型
type Awaited<T> = T extends Promise<infer U> ? U : T;

// 示例
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return Promise.resolve({ id, name: 'John' });
}

type FetchUserParams = Parameters<typeof fetchUser>;     // [number]
type FetchUserReturn = ReturnType<typeof fetchUser>;     // Promise<{ id: number; name: string }>
type UserData = Awaited<ReturnType<typeof fetchUser>>;  // { id: number; name: string }
```

## 递归类型

TypeScript 支持递归类型定义，这对于处理嵌套数据结构非常有用。

```typescript
// 深度只读类型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 深度可选类型
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedObject {
  level1: {
    level2: {
      level3: string;
    };
  };
}

type ReadonlyNested = DeepReadonly<NestedObject>;
type PartialNested = DeepPartial<NestedObject>;
```

## 实际应用场景

### 1. API 响应类型推断

```typescript
// 根据 API 路径推断响应类型
type ApiResponse<T extends string> = T extends `/users/${number}`
  ? { id: number; name: string; email: string }
  : T extends '/users'
  ? Array<{ id: number; name: string; email: string }>
  : never;

type UserResponse = ApiResponse<'/users/1'>;        // { id: number; name: string; email: string }
type UsersResponse = ApiResponse<'/users'>;         // Array<{ id: number; name: string; email: string }>
```

### 2. 表单验证类型

```typescript
type ValidationRule<T> = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => boolean | string;
};

type FormSchema<T> = {
  [P in keyof T]: ValidationRule<T[P]>;
};

interface LoginForm {
  username: string;
  password: string;
}

type LoginValidation = FormSchema<LoginForm>;
```

## 性能考虑

虽然高级类型提供了强大的功能，但也要注意：

1. **编译时间**: 复杂的条件类型可能增加编译时间
2. **类型检查**: 过度复杂的类型可能影响 IDE 的类型检查性能
3. **可读性**: 平衡类型安全性和代码可读性

## 最佳实践

1. **渐进式采用**: 从简单类型开始，逐步引入高级特性
2. **文档化**: 为复杂类型添加注释说明
3. **测试**: 编写类型测试确保类型正确性
4. **重构**: 定期重构复杂类型，保持代码清晰

## 总结

TypeScript 的高级类型系统为我们提供了构建类型安全应用的强大工具。通过合理使用条件类型、映射类型和模板字面量类型，我们可以：

- 创建更加精确的类型定义
- 减少运行时错误
- 提供更好的开发体验
- 构建可维护的代码库

掌握这些高级类型技巧，将大大提升我们的 TypeScript 开发能力。

---

*本文介绍了 TypeScript 的高级类型特性，更多详细信息请参考官方文档和类型体操练习。*
