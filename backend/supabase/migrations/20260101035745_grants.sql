-- Grant usage on schema
grant usage on schema public to anon, authenticated, service_role;

-- Grant all on sequences
grant all on all sequences in schema public to anon, authenticated, service_role;

-- Public (Anon) Access - usually read-only for catalog
grant select on table public.products, public.categories, public.stores, public.reviews to anon;
grant insert on table public.users to anon; -- Allow signup

-- Authenticated User Access
grant all on table public.users, public.user_addresses, public.carts, public.cart_items, public.transactions, public.reviews to authenticated;
grant select on table public.products, public.categories, public.stores to authenticated;

-- Service Role (Admin/Backend)
grant all on all tables in schema public to service_role;