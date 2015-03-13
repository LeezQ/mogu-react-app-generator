<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>route test</title>

</head>
<body>
<script>
    var data = {
        "name": "hello",
        "typelist": [12,3,21,3]
    }
</script>

<div id="body_wrap">
    <div class="container-fluid">
        <div id="nav"></div>
        <div class="content-wrap clearfix">
            <div id="sidebar" class="sidebar fl"></div>
            <div id="content" class="content fl"></div>
        </div>
    </div>

</div>


<script src="/node_modules/react/dist/react.js"></script>
<script src="/app/base/js/jquery-2.1.3.min.js"></script>
<script src="/app/base/js/proxy.js"></script>

<?php include('./simple_route.php'); ?>

<script src="<?php echo $jsFile;?>"></script>


</body>
</html>