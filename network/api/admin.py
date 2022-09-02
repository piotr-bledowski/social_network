from django.contrib import admin
from .models import Post, Comment, CommentResponse, PostLikes

# Register your models here.
class PostAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass

class CommentResponseAdmin(admin.ModelAdmin):
    pass

class PostLikesAdmin(admin.ModelAdmin):
    pass

admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(CommentResponse, CommentResponseAdmin)
admin.site.register(PostLikes, PostLikesAdmin)