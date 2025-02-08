export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      locations: {
        Row: {
          id: string
          user_id: string
          latitude: number
          longitude: number
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          latitude: number
          longitude: number
          timestamp: string
          created_at?: string
        }
      }
      tracks: {
        Row: {
          id: string
          user_id: string
          start_time: string
          end_time: string | null
          distance: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          start_time: string
          end_time?: string | null
          distance?: number
          created_at?: string
        }
      }
    }
  }
} 