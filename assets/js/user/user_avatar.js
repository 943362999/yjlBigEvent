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
    console.log(e.target.files);
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
});
