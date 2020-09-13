$(function () {
    initList()

    function initList() {
        $.get('/my/article/cates', function (res) {
            if (res.status === 0) {
                var strHtml = template('tpl-table', res)
                $('tbody').html(strHtml)
            }
        })
    }
    $('#addBtn').on('click', function (e) {
        e.preventDefault()

        var strAddHtml = $('#tpl-add').html()
        addIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: strAddHtml,
        })

    })
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault()
        $.post(`/my/article/addcates`, $(this).serialize(), function (res) {
            // console.log(res);
            if (res.status === 0) {
                initList();
                layer.close(addIndex)
            }
        })
    })
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault()
        // console.log(111);
        var strEditHtml = $('#tpl-edit').html()
        editIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: strEditHtml,
        })
        //获取button的data-Id属性值
        var Id = $(this).attr('data-id')
        $.get(`/my/article/cates/${Id}`, function (res) {
            // console.log(res);
            if (res.status === 0) {
                layui.form.val('editForm', res.data)
            }
        })
    })
    $('body').on('submit', '#editForm', function (e) {
        e.preventDefault()
        $.post('/my/article/updatecate', $(this).serialize(), function (res) {
            console.log(res)
            initList()
            layer.close(editIndex);
        })
    })
    $('tbody').on('click', '.btn-delete', function (e) {
        e.preventDefault()
        var Id = $(this).attr('data-id')
        // console.log(Id)
        // 弹层：
        layer.confirm('Sure?', {
            icon: 3,
            title: '真的要把我删除嘛？'
        }, function (
            index
        ) {
            //do something
            $.get(`/my/article/deletecate/${Id}`, function (res) {
                if (res.status === 0) {
                    initList()

                    layer.close(index)
                }
            })
        })
    })



})