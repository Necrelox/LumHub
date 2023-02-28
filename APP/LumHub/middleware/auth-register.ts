import { isAuthenticated } from '@/composables/CookieToken';

export default defineNuxtRouteMiddleware(() => {
  if (!isAuthenticated()) {
    return navigateTo('/auth/register', { redirectCode: 301 });
  }
});
