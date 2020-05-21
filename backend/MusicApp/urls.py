from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('homepage.urls')),
    path('api/', include('homepage.api.urls')),
    path('api-auth/', include('rest_framework.urls'))
]
