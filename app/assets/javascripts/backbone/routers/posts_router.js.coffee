class Aaronreisman.Routers.PostsRouter extends Backbone.Router
  initialize: (options) ->
    @posts = new Aaronreisman.Collections.PostsCollection()
    @posts.reset options.posts

  routes:
    "blog/new"      : "newPost"
    "blog/index"    : "index"
    "blog/:id/edit" : "edit"
    "blog/:id"      : "show"
    "blog"        : "index"

  newPost: ->
    @view = new Aaronreisman.Views.Posts.NewView(collection: @posts)
    $("#content").html(@view.render().el)

  index: ->
    @view = new Aaronreisman.Views.Posts.IndexView(posts: @posts)
    $("#content").html(@view.render().el)

  show: (id) ->
    post = @posts.get(id)

    @view = new Aaronreisman.Views.Posts.ShowView(model: post)
    $("#content").html(@view.render().el)

  edit: (id) ->
    post = @posts.get(id)

    @view = new Aaronreisman.Views.Posts.EditView(model: post)
    $("#content").html(@view.render().el)
