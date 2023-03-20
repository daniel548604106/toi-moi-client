import Router from 'next/router';

export const redirectUser = (ctx, location) => {
  // If ctx.req exists , it means that the user is on server side
  if (ctx.req) {
    ctx.res.writeHead('302', { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};
