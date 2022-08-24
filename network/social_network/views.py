from django.shortcuts import render
from .forms import CreateUserForm

# Create your views here.


def index(request):
    return render(request, 'build/index.html')


def register(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()

    return render(request, 'register.html', {'form': form})


def login(request):
    return render(request, 'login.html')
