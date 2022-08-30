from django.shortcuts import render, redirect
from .forms import CreateUserForm
from django.contrib.auth import login, logout, authenticate

# Create your views here.


def index(request):
    return render(request, 'build/index.html')


def registerPage(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')

    return render(request, 'register.html', {'form': form})


def loginPage(request):  # named loginPage instead of login in order to avoid conflict with django method imported from auth
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        login(request, user)
        return redirect('index')

    return render(request, 'login.html')


def logoutUser(request):
    return redirect('login')
