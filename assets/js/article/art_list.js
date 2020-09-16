$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }


    template.defaults.imports.formatDate = function (olddate) {
        // console.log(olddate) // 2020-09-13 01:45:39.448
        // 处理逻辑
        // console.log(moment)
        var timenew = moment(olddate).format('MMMM Do YYYY, h:mm:ss a')
        return timenew
    }

    function initArtList() {
        $.ajax({

            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status === 0) {
                    var strHtml = template('tpl-table', res)
                    $('tbody').html(strHtml)
                } else(
                    renderPage(res.total)
                )
            }
        })
    }
    initCate()

    function initCate() {
        $.get(`/my/article/cates`, function (res) {
            console.log(res);
            var strHtml = template('tpl-cate', res)
            $('#sct-cate').html(strHtml)
            layui.form.render()
        })
    }
    $('#form-search').submit(function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initArtList()
    })

    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage

            //执行一个laypage实例
            laypage.render({
                elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                curr: q.pagenum, // 当前页码
                limit: q.pagesize, //  每页条数

                limits: [2, 3, 5, 10], // 切换每页条数pagesize
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],

                // 情况1：默认第一次时调用！！！！！！！
                // 情况2：切换页码时，调用jump函数
                jump: function (obj, first) {
                    //首次不执行
                    if (!first) {
                        //obj包含了当前分页的所有参数，比如：
                        // console.log(obj.curr) //得到当前页，以便向服务端请求对应页的数据。
                        // console.log(obj.limit); //得到每页显示的条数

                        // 按照最新页码获取文章列表数据
                        q.pagenum = obj.curr // 2  pagesize=2  => 服务器返回数据库中的第3和第4条数据
                        q.pagesize = obj.limit
                        //do something
                        initArtList()
                    } else {}
                },
            })
        })





    }
    $('tbody').on('click', '.delete', function (e) {
        e.preventDefault()
        var Id = $(this).attr('data-id')
        var len = $('.delete').length
        layer.confirm('Sure?', {
            icon: 3,
            title: '删除文章'
        }, function (index) {
            // ajax
            $.get(`/my/article/delete/${Id}`, function (res) {
                if (res.status === 0) {
                    if (len === 1) {
                        // 改变页码pagenum
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    layer.close(index)
                    initArtList()
                }
            })
        })



    })















})