## 1)Чтобы скачать с гитхаба проект и запустить, делаем следующие шаги:
#### 1.1) Создаем пустую папку на рабочем столе(можно в других местах) и задаем любое имя.
#### 1.2) Открываем командную строку и через командную строку переходим в ту папку который создали или заходим в эту папку и на верху стоит путь к этой папке, нажимаем на ту места и пишем cmd.
#### 1.3) После выполнения 1.2 пункта, в командной строке пишем ' git clone https://github.com/Ereke013/greet-task_front.git '.
#### 1.4) Появляется новая папка в котором есть проект, не закрывая командную строку пишем команду ' cd greet-task_front ', после пишем ' npm install ', после этого запускаем команду ' npm start '.
#### 1.5) Ждём, когда запуститься сервер. После запуска сервера, автоматический заходить в браузер. Если после запуска не открылся браузер, заходим в браузере по адресу http://localhost:3000.
#### 1.6) Видим: 
#### ![image](https://user-images.githubusercontent.com/51377709/118414553-157a0f00-b6c7-11eb-9695-15607b3c6f54.png)
<br />

## Чтобы выполнить следующие шаги, нам понадобится серверная часть, серверная часть находится по следующей ссылке:
#### https://github.com/Ereke013/GreetgoTask

<br />

<br />

## 2) Страница Login и Register:
#### 2.1) Заходим в Login для авторизации, и в Register для регистрации.


## ** Все данные хранятся в базе данных. База находится в хосте, и эта база находится далеко от нашей местоположении, так как хост находится далеко данные может задержатся на 2-3-4сек для загрузки. Для каждого запроса от базы и для представление уходят максимум 3-4сек. **

#### 2.3) На странице авторизации после ввода данных прошу подождать 2-3сек для загрузки данных.
#### 2.4) Супер Админские данные:
##### 2.4.1) email: admin@gmail.com, password: qweqwe.
##### 2.4.2) email: superadmin@gmail.com, password: adminadmin.

#### 2.5) Registration:
##### 2.5.1) После регистрации ссылка передается на страниц авторизации и созданному пользователю дается роль обычного юзера.

<br />

#### 2.6) Все пароли шифруется, и авторизация проходит через jwtToken. Все ссылки проходит через безопасность, только для авторизованных пользователей.

<br />

## 3)После авторизации:
#### 3.1) Попадаем в домашнюю страницу.
#### 3.2) Есть страница всех учеников и страница всех классов по которому можно смотреть в каком классе учится какие ученики.

<br />

## 4)Роли и их способности:
#### 4.1) Админы могут добавлять учеников и классов, также могут удалять учеников.
#### 4.2) Ученики могут просматривать список классов, учеников и добавить учеников.
#### 4.3) Также загрузка данных могут задержатся максимум на 3-4.
