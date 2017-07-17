//引入gulp及组件
var gulp = require('gulp'),                           //基础库
    htmlmin = require('gulp-htmlmin'),                //压缩html
    rev = require('gulp-rev-append'),                 //给页面的引用添加版本号，清除页面引用缓存
    //autoprefixer = require('gulp-autoprefixer'),    //根据设置浏览器版本自动处理浏览器前缀
    //cssmin= require('gulp-minify-css'),               //css压缩（已经作废）
    cssmin= require('gulp-clean-css'),               //css压缩
    cssver = require('gulp-make-css-url-version'),    // css文件引用URL加版本号
    jshint = require('gulp-jshint'),                  //js检查
    jsmin = require('gulp-uglify'),                   //js压缩
    concat = require('gulp-concat'),                  //合并文件
    rename = require('gulp-rename'),                  //文件重命名
    imagemin = require('gulp-imagemin'),              //图片压缩
    pngquant = require('imagemin-pngquant'),          //深度压缩png图片
    cache = require('gulp-cache'),                    //图片快取，只有更改过得图片会进行压缩
    notify = require('gulp-notify'),                  //更动通知
    clean = require('gulp-clean');                    //清空文件夹
    connect = require('gulp-connect'),                //web服务
    browserSync = require('browser-sync'),            //浏览器同步
    reload = browserSync.reload;                      //自动刷新

//配置开发和发布路径
var path = {
    //开发环境
    src:{
        html:'./src/*.html',
        css:['./src/css/*.css'],
        js:['./src/js/index.js'],
        //js:['./src/js/*.js','!./src/js/{zepto.min}.js'],
        //sass:'./src/sass', 
        image:'./src/images/**/*'
    },
    //发布环境
    build:{
        html:'./build',
        js:'./build/js',
        css:'./build/css',
        image:'./build/images'
    },
    //不被处理的文件得复制
    copy:[
            {from:'./src/audio/*',to:'./build/audio'},
            {from:['./src/js/*','!./src/js/index.js'],to:'./build/js'}
        ],
    clear:['./build/*.html',
           './build/css/main.css',
           './build/js/main.js',
           './build/images'
    ]
};

/**
 * 建立任务
 * */
// 定义web服务模块
gulp.task('webserver', function() {
   connect.server({
       livereload: true,
       port: 8888
   });
});

// 定义web服务模块，增加浏览器同步浏览
gulp.task('browser-sync', function() {
   browserSync({
       server: {
           baseDir: '.'
       }
   });
});

//1.HTML压缩
/*注意:压缩时，textarea会出错，需要手动修改*/
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
        /*不要压页面中的JS和CSS容易出错*/
        //minifyJS: true,//压缩页面JS
        //minifyCSS: true//压缩页面CSS
    };
    gulp.src(path.src.html)
        .pipe(rev())
        //.pipe(htmlmin(options))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}))
        .pipe(notify({message:'Html task complete'}));
});

//2.CSS压缩(基本使用) 合并之后，记得手动修改html中的引入路径
gulp.task('css', function () {
    gulp.src(path.src.css)
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     //是否美化属性值 默认：true 像这样：
        //     //-webkit-transform: rotate(45deg);
        //     //        transform: rotate(45deg);
        //     cascade:true,
        //     remove:true //是否去掉不必要的前缀 默认：true
        // }))

        .pipe(concat('index.css'))
        .pipe(cssver())                    // CSS文件引用URl加版本号
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        //.pipe(rename({ suffix: '.min' })) //如果是多个css合并，记得修改html引入文件的名字
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}))
        .pipe(notify({message:'Css task complete'}));
});

//3.js语法检查及压缩
gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(jshint())   
        .pipe(jshint.reporter('default'))
        //.pipe(concat('main.js'))
        .pipe(jsmin())
        //.pipe(rename({suffix: '.min' }))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}))
        .pipe(notify({message:'Javascript task complete'}));
});

//4.图片处理
gulp.task('image', function(){
    return gulp.src(path.src.image)
        .pipe(cache(imagemin({
            optimizationLevel:5,//类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive:true,//类型：Boolean 默认：false 无损压缩jpg图片
            interlaced:true,//类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass:true,//类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()] //深度处理png格式的图片
        })))
        .pipe(gulp.dest(path.build.image))
        .pipe(reload({stream: true}))
        .pipe(notify({message:'Images task complete'}));
});

//5.复制文件
gulp.task('copy', function(){
    for(var i=0,items=path.copy,len=items.length;i<len;i++){
        gulp.src(items[i].from).pipe(gulp.dest(items[i].to))
            .pipe(notify({message:'copy task complete'}));
    }
});
  

//6.清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(path.clear,{read: false})
        .pipe(clean())
        .pipe(notify({message: 'Clean task complete'}));
});

//7.默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','js','image','copy');
});

//X.监听任务 运行语句 gulp watch
//watch方法是用于监听文件变化，文件一修改就会执行指定的任务
gulp.task('watch', function () {
    //监听html
    gulp.watch(path.src.html, function (event) {
        gulp.run('html');
    });
    // 监听css
    gulp.watch(path.src.css, function () {
        gulp.run('css');
    });
    // 监听js
    gulp.watch(path.src.js, function () {
        gulp.run('js');
    });
    // 监听images
    gulp.watch(path.src.image, function () {
        gulp.run('image');
    });
});