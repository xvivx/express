const express = require('express');
const handlebars = require('express3-handlebars');
const app = express();


// 设置视图引擎
const templates = handlebars.create({ defaultLayout: 'main' });

app.engine('handlebars', templates.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));


// 设置程序路由
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', {
        random: Math.floor(Math.random() * 100) + 1
    });
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res) => {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(3000);