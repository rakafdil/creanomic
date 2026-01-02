-- USERS
create policy "Public profiles are viewable by everyone" on public.users
  for select using (true);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- PRODUCTS
create policy "Products are viewable by everyone" on public.products
  for select using (true);

create policy "Sellers can insert their own products" on public.products
  for insert with check (auth.uid() = seller_id);

create policy "Sellers can update their own products" on public.products
  for update using (auth.uid() = seller_id);

-- CARTS
create policy "Users can view their own cart" on public.carts
  for select using (auth.uid() = user_id);

create policy "Users can create their own cart" on public.carts
  for insert with check (auth.uid() = user_id);

-- TRANSACTIONS
create policy "Users can view their own transactions" on public.transactions
  for select using (auth.uid() = buyer_id OR auth.uid() = seller_id);