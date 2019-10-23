module.exports = async(ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        let err = {
          status: ctx.response.status,
          error: ctx.response.message
        }
        ctx
          .app
          .emit('error', err, ctx);
      }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      console.log(err);
      ctx
        .app
        .emit('error', err, ctx);
    }
  }