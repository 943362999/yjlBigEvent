$(function () {
  var $image = $("#image");

  var options = {
    aspectRatio: 1,
    preview: ".img-preview",
  };
  $image.cropper(options);
  //上传按钮
  console.log($("#file"));
  $("#btn-upload").click(function () {
    $("#file").click();
  });
  $("#file").on("change", function (e) {
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  $('#sure').click(function (e) {
    e.preventDefault()
    var dataUrl = $image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
      })
      //讲Canvas画布上的内容,转化为base64格式的字符串
      .toDataURL('image/jpg')
    console.log($image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
      }));
    console.log($image);
    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataUrl
      },
      success: function (res) {
        if (res.status === 0) {

          window.parent.getInfo()
        }
      }

    })
  })
});