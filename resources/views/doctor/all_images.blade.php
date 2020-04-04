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

    * {
        box-sizing: border-box;
    }

    .column {
        float: left;
        width: 33.33%;
        padding: 5px;
    }

    /* Clearfix (clear floats) */
    .row::after {
        content: "";
        clear: both;
        display: table;
    }
</style>

<?php use Illuminate\Support\Facades\Storage; ?>
<div class="row">
@foreach ($images as $image)
    @if($image->id <= 16)
        <div class="column">
            <h3>{{'Radiografia '.$image->id}}</h3>
            <img src="{{ Storage::url($image->path) }}" title="{{'Radiografia '.$image->id}}">
        </div>
    @endif
@endforeach
</div>

<script>
    const imgs = document.querySelectorAll("img");

    for (let x = 0; x < imgs.length; x++) {
        imgs[x].addEventListener("click", function () {
            window.opener.image(this.src); // envia para a função a imagem escolhida
            window.close(); // fecha a janela ao escolher uma imagem
        });
    }
</script>
