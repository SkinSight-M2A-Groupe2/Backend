-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.

create function public.handle_new_user()
returns trigger as $$
begin
    insert into public.user_profiles (id, full_name, avatar_url, email, phone, updated_at)
    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email, new.phone, now());
    return new;
end;

$$ language plpgsql security definer;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- FUNCTION TO UPDATE USER PROFILE
create or replace function public.handle_update_user() 
returns trigger as $$
begin
    update public.user_profiles
    set email = new.email
    where id = new.id;
    return new;
end;

$$ language plpgsql security definer set search_path = public;
create trigger on_auth_user_updated
    after update of email on auth.users
  for each row execute procedure public.handle_update_user();
