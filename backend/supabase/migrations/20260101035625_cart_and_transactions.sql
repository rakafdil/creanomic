-- 1. Carts
create table "public"."carts" (
    "id" uuid not null default gen_random_uuid() primary key,
    "user_id" uuid not null references public.users(id),
    "total_price" numeric not null default 0,
    "coupon" text,
    "created_at" timestamp with time zone default now() -- Added created_at
);

alter table "public"."carts" enable row level security;

-- 2. Cart Items
create table "public"."cart_items" (
    "cart_id" uuid not null references public.carts(id) on delete cascade,
    "product_id" bigint not null references public.products(id),
    "seller_id" uuid references public.seller(seller_id),
    "quantity" bigint default 1,
    "price" numeric, -- Snapshot price at time of adding
    primary key ("cart_id", "product_id") -- Composite Primary Key is better here
);

alter table "public"."cart_items" enable row level security;

-- 3. Transactions
create sequence "public"."transactions_id_seq";

create table "public"."transactions" (
    "id" bigint not null default nextval('public.transactions_id_seq'::regclass) primary key,
    "buyer_id" uuid references public.users(id) on delete set null,
    "seller_id" uuid references public.seller(seller_id),
    "total_amount" numeric(12,2) not null,
    "payment_method" text check (payment_method in ('wallet', 'bank_transfer', 'cod', 'ewallet')),
    "status" text default 'pending' check (status in ('pending', 'paid', 'shipped', 'completed', 'cancelled')),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);

alter table "public"."transactions" enable row level security;

-- 4. Reviews
create sequence "public"."reviews_id_seq";

create table "public"."reviews" (
    "id" bigint not null default nextval('public.reviews_id_seq'::regclass) primary key,
    "user_id" uuid references public.users(id) on delete cascade,
    "product_id" bigint references public.products(id) on delete cascade,
    "rating" integer check (rating >= 1 and rating <= 5),
    "comment" text,
    "created_at" timestamp with time zone default now()
);

create index idx_reviews_product_id on public.reviews(product_id);
create index idx_reviews_user_id on public.reviews(user_id);