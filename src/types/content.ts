export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  readTime: string
  author: string
  category: string
  featured?: boolean
  slug: string
}

export interface Tag {
  id: string
  name: string
  color: string
  description: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface PaginationResult<T> {
  data: T[]
  total: number
  totalPages: number
  currentPage: number
  pageSize: number
} 