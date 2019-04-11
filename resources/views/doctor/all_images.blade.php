<style>
	img {
		height: 100px;
		margin: 5px;
		border: 2px solid #fff;
		cursor: pointer;
	}

	img:hover {
		border-color: #EA0404;
	}
</style>

<?php use Illuminate\Support\Facades\Storage; ?>
@foreach ($images as $image)
	<img src="{{ Storage::url($image->path) }}" title="{{'Radiografia '.$image->id}}">
@endforeach

<script>
    const imgs = document.querySelectorAll("img");

    for (let x = 0; x < imgs.length; x++) {
        imgs[x].addEventListener("click", function () {
            window.opener.image(this.src); // envia para a função a imagem escolhida
            window.close(); // fecha a janela ao escolher uma imagem
        });
    }
</script>
