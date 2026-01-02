-- ==========================================
-- 1. USERS & ADDRESSES
-- ==========================================

-- Users can read their own data; Public can read basic profile info (optional)
create policy "Users manage own profile" on public.users
    using (auth.uid() = id);

-- Addresses are strictly private
create policy "Users manage own addresses" on public.user_addresses
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ==========================================
-- 2. PRODUCTS & INVENTORY
-- ==========================================

-- Anyone can VIEW products (Catalog)
create policy "Public view products" on public.products
    for select using (true);

-- Only the Seller who owns the product can UPDATE/DELETE it
create policy "Sellers manage own products" on public.products
    for all 
    using (auth.uid() = seller_id)
    with check (auth.uid() = seller_id);

-- ==========================================
-- 3. COMMERCE (Carts & Transactions)
-- ==========================================

-- Carts: Users manage their own carts
create policy "Users manage own carts" on public.carts
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users manage own cart items" on public.cart_items
    using (
        exists (
            select 1 from public.carts 
            where carts.id = cart_items.cart_id 
            and carts.user_id = auth.uid()
        )
    );

-- Transactions: Visible to the Buyer AND the Seller involved
create policy "Buyers and Sellers view transactions" on public.transactions
    for select
    using (
        auth.uid() = buyer_id 
        or 
        auth.uid() = seller_id
    );

-- Transaction Items: Visible if the parent transaction is visible
create policy "View transaction items" on public.transaction_items
    for select
    using (
        exists (
            select 1 from public.transactions
            where transactions.id = transaction_items.transaction_id
            and (transactions.buyer_id = auth.uid() or transactions.seller_id = auth.uid())
        )
    );

-- ==========================================
-- 4. REVIEWS
-- ==========================================

-- Public read reviews
create policy "Public read reviews" on public.reviews
    for select using (true);

-- Authenticated users create reviews
create policy "Users create reviews" on public.reviews
    for insert 
    with check (auth.uid() = user_id);

-- Users can delete their own reviews
create policy "Users delete own reviews" on public.reviews
    for delete
    using (auth.uid() = user_id);