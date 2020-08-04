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
@foreach($images as $imageLandmark)
    <div class="column">
        <?php $image = \App\Models\Image::find($imageLandmark->fk_id_image); ?>
        <h3>{{'Radiografia '.$image->id}}</h3>
        <img src="{{ Storage::url($image->path) }}" title="{{'Radiografia '.$image->id}}" alt="{{$image->id}}">
    </div>
@endforeach
</div>

<script>
    let imgs = document.querySelectorAll("img");
    for (let x = 0; x < imgs.length; x++) {
        imgs[x].addEventListener("click", function () {
            window.opener.image(this.src, this.alt); /*envia para a função a imagem escolhida*/
            window.close(); /*fecha a janela ao escolher uma imagem*/
        });
    }
</script>
