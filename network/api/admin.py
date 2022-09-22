from django.contrib import admin
from .models import Friend, FriendRequest, Group, GroupMember, Post, Comment, Reply, PostLike, CommentLike, ReplyLike, ProfilePicture

# Register your models here.
class PostAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass

class ReplyAdmin(admin.ModelAdmin):
    pass

class PostLikeAdmin(admin.ModelAdmin):
    pass


class CommentLikeAdmin(admin.ModelAdmin):
    pass


class ReplyLikeAdmin(admin.ModelAdmin):
    pass


class ProfilePictureAdmin(admin.ModelAdmin):
    pass


class GroupAdmin(admin.ModelAdmin):
    pass


class GroupMemberAdmin(admin.ModelAdmin):
    pass


class FriendAdmin(admin.ModelAdmin):
    pass


class FriendRequestAdmin(admin.ModelAdmin):
    pass


admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Reply, ReplyAdmin)
admin.site.register(PostLike, PostLikeAdmin)
admin.site.register(CommentLike, CommentLikeAdmin)
admin.site.register(ReplyLike, ReplyLikeAdmin)
admin.site.register(ProfilePicture, ProfilePictureAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(GroupMember, GroupMemberAdmin)
admin.site.register(Friend, FriendAdmin)
admin.site.register(FriendRequest, FriendRequestAdmin)