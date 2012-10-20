class Aaronreisman.Routers.PostsRouter extends Backbone.Router
  initialize: (options) ->
    this.bind "all", (route, router) ->
      $('#menu a').removeClass('selected')
      $('#menu a').eq(1).addClass('selected')
    @posts = new Aaronreisman.Collections.PostsCollection()
    @posts.reset options.posts

  routes:
    "blog/index"    : "index"
    "blog/:slug"      : "show"
    "blog"        : "index"

  index: ->
    @view = new Aaronreisman.Views.Posts.IndexView(posts: @posts)
    $("#content").html(@view.render().el)

  show: (slug) ->
    post = @posts.where({slug: slug})[0]

    @view = new Aaronreisman.Views.Posts.ShowView(model: post)
    $("#content").html(@view.render().el)
