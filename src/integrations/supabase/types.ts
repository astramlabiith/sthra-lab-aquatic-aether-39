export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      album_images: {
        Row: {
          album_id: string
          created_at: string
          display_order: number
          id: string
          image_url: string
        }
        Insert: {
          album_id: string
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
        }
        Update: {
          album_id?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_images_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          album_date: string | null
          cover_image_url: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          album_date?: string | null
          cover_image_url: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          album_date?: string | null
          cover_image_url?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      awards: {
        Row: {
          award: string
          created_at: string
          description: string | null
          display_order: number
          icon: string
          id: string
          kind: Database["public"]["Enums"]["award_kind"]
          organization: string | null
          recipient: string
          updated_at: string
          year: string
        }
        Insert: {
          award: string
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string
          id?: string
          kind: Database["public"]["Enums"]["award_kind"]
          organization?: string | null
          recipient: string
          updated_at?: string
          year: string
        }
        Update: {
          award?: string
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string
          id?: string
          kind?: Database["public"]["Enums"]["award_kind"]
          organization?: string | null
          recipient?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      careers: {
        Row: {
          apply_email: string | null
          apply_link: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_open: boolean
          kind: Database["public"]["Enums"]["career_kind"]
          requirements: string[]
          title: string
          updated_at: string
        }
        Insert: {
          apply_email?: string | null
          apply_link?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_open?: boolean
          kind: Database["public"]["Enums"]["career_kind"]
          requirements?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          apply_email?: string | null
          apply_link?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_open?: boolean
          kind?: Database["public"]["Enums"]["career_kind"]
          requirements?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          instructor: string | null
          kind: Database["public"]["Enums"]["course_kind"]
          semester: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          instructor?: string | null
          kind: Database["public"]["Enums"]["course_kind"]
          semester?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          instructor?: string | null
          kind?: Database["public"]["Enums"]["course_kind"]
          semester?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          categories: string[]
          category: Database["public"]["Enums"]["project_category"]
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          link: string | null
          progress: number
          publications: string[]
          title: string
          updated_at: string
        }
        Insert: {
          categories?: string[]
          category: Database["public"]["Enums"]["project_category"]
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          link?: string | null
          progress?: number
          publications?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          categories?: string[]
          category?: Database["public"]["Enums"]["project_category"]
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          link?: string | null
          progress?: number
          publications?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      publications: {
        Row: {
          abstract: string | null
          authors: string
          created_at: string
          display_order: number
          doi: string | null
          id: string
          kind: Database["public"]["Enums"]["publication_kind"]
          pdf_link: string | null
          title: string
          updated_at: string
          venue: string
          year: string
        }
        Insert: {
          abstract?: string | null
          authors: string
          created_at?: string
          display_order?: number
          doi?: string | null
          id?: string
          kind: Database["public"]["Enums"]["publication_kind"]
          pdf_link?: string | null
          title: string
          updated_at?: string
          venue: string
          year: string
        }
        Update: {
          abstract?: string | null
          authors?: string
          created_at?: string
          display_order?: number
          doi?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["publication_kind"]
          pdf_link?: string | null
          title?: string
          updated_at?: string
          venue?: string
          year?: string
        }
        Relationships: []
      }
      research_grants: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          duration: string | null
          grant_type: string | null
          id: string
          institution: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          grant_type?: string | null
          id?: string
          institution?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          grant_type?: string | null
          id?: string
          institution?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          category: Database["public"]["Enums"]["team_category"]
          created_at: string
          display_order: number
          education: string | null
          email: string | null
          full_bio: string | null
          id: string
          image_url: string | null
          linkedin: string | null
          name: string
          role: string | null
          short_bio: string | null
          specialization: string | null
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["team_category"]
          created_at?: string
          display_order?: number
          education?: string | null
          email?: string | null
          full_bio?: string | null
          id?: string
          image_url?: string | null
          linkedin?: string | null
          name: string
          role?: string | null
          short_bio?: string | null
          specialization?: string | null
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["team_category"]
          created_at?: string
          display_order?: number
          education?: string | null
          email?: string | null
          full_bio?: string | null
          id?: string
          image_url?: string | null
          linkedin?: string | null
          name?: string
          role?: string | null
          short_bio?: string | null
          specialization?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      award_kind: "pi" | "lab"
      career_kind: "Internship" | "Hiring"
      course_kind: "current" | "upcoming"
      project_category:
        | "UAVs"
        | "AUVs"
        | "ROVs"
        | "USVs"
        | "GNSS"
        | "Mars Rovers"
      publication_kind: "research" | "conference"
      team_category:
        | "pi"
        | "phd"
        | "mtech"
        | "project_staff"
        | "intern"
        | "btech"
        | "alumni"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      award_kind: ["pi", "lab"],
      career_kind: ["Internship", "Hiring"],
      course_kind: ["current", "upcoming"],
      project_category: ["UAVs", "AUVs", "ROVs", "USVs", "GNSS", "Mars Rovers"],
      publication_kind: ["research", "conference"],
      team_category: [
        "pi",
        "phd",
        "mtech",
        "project_staff",
        "intern",
        "btech",
        "alumni",
      ],
    },
  },
} as const
