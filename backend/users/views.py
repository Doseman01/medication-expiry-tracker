from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib import messages

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('medications-html')  # or any other page
        else:
            messages.error(request, 'Invalid username or password')
    return render(request, 'users/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

