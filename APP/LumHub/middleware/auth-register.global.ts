import { isAuthenticated } from '@/composables/CookieToken';

export default defineNuxtRouteMiddleware((to) => {
  if (!isAuthenticated() && to.path !== '/auth/register' && to.path !== '/auth/login') {
    return navigateTo('/auth/register', { redirectCode: 301 });
  }
});
