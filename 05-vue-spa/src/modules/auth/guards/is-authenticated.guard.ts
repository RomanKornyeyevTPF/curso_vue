import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const isAuthenticatedGuard = (
  to:RouteLocationNormalized,
  from:RouteLocationNormalized,
  next:NavigationGuardNext
) => {
  const userId = localStorage.getItem('userId');
  localStorage.setItem('lastPath', to.path); // guardo la última ruta a la que ha intentado acceder

  if (!userId) {
    return next({ name: 'login' });
  }

  return next();
}

export default isAuthenticatedGuard;