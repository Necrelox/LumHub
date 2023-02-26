import { isAuthenticated } from '@/composables/CookieToken';

export default defineNuxtRouteMiddleware(() => {
  // mettre en global et check to ou from si c'est pas /auth/register
  if (!isAuthenticated()) {
    return navigateTo('/auth/Register', { redirectCode: 301 });
  }
});
