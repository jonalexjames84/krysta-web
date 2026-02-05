export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          compare_at_price: number | null;
          inventory_quantity: number;
          collection_id: string | null;
          is_featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          price: number;
          compare_at_price?: number | null;
          inventory_quantity?: number;
          collection_id?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          price?: number;
          compare_at_price?: number | null;
          inventory_quantity?: number;
          collection_id?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          email: string;
          status: string;
          payment_status: string;
          stripe_checkout_session_id: string | null;
          stripe_payment_intent_id: string | null;
          subtotal: number;
          shipping_cost: number;
          tax: number;
          total: number;
          shipping_name: string | null;
          shipping_address_line1: string | null;
          shipping_address_line2: string | null;
          shipping_city: string | null;
          shipping_state: string | null;
          shipping_postal_code: string | null;
          shipping_country: string | null;
          customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          email: string;
          status?: string;
          payment_status?: string;
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          subtotal: number;
          shipping_cost?: number;
          tax?: number;
          total: number;
          shipping_name?: string | null;
          shipping_address_line1?: string | null;
          shipping_address_line2?: string | null;
          shipping_city?: string | null;
          shipping_state?: string | null;
          shipping_postal_code?: string | null;
          shipping_country?: string | null;
          customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          email?: string;
          status?: string;
          payment_status?: string;
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          subtotal?: number;
          shipping_cost?: number;
          tax?: number;
          total?: number;
          shipping_name?: string | null;
          shipping_address_line1?: string | null;
          shipping_address_line2?: string | null;
          shipping_city?: string | null;
          shipping_state?: string | null;
          shipping_postal_code?: string | null;
          shipping_country?: string | null;
          customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          price: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          price: number;
          quantity: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          price?: number;
          quantity?: number;
          created_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          status?: string;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
      };
      gallery_images: {
        Row: {
          id: string;
          url: string;
          alt_text: string | null;
          caption: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          alt_text?: string | null;
          caption?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          alt_text?: string | null;
          caption?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Helper types
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Convenience types
export type Collection = Tables<"collections">;
export type Product = Tables<"products">;
export type ProductImage = Tables<"product_images">;
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type Customer = Tables<"customers">;
export type Inquiry = Tables<"inquiries">;
export type NewsletterSubscriber = Tables<"newsletter_subscribers">;
export type GalleryImage = Tables<"gallery_images">;
export type SiteSetting = Tables<"site_settings">;

// Extended types with relations
export type ProductWithImages = Product & {
  product_images: ProductImage[];
  collection?: Collection | null;
};

export type OrderWithItems = Order & {
  order_items: OrderItem[];
};
