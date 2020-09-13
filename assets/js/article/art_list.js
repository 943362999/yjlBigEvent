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
                    layer.msg(res.message)
                )
            }
        })
    }
})