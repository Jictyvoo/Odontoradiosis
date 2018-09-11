<div class="container">
	<div class="row">
		<div class="col-md-2"></div>
		<div class="col-md-8">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h1 class="panel-title" align="center">ERRO 404</h1>
				</div>
				<div class="panel-body">
					<h2>A Página solicitada não pode ser encontrada</h2>
					<p>Código solicitado<code>
						<?php
							if(isset($_SESSION['errorFound'])){
								echo $_SESSION['errorFound'];
							}
							else{
								if(isset($_GET['selectPage'])){
									echo $_GET['selectPage'];
								}
								else{
									echo "Unknown";
								}
							}
						?>
						</code>não encontrado</p>
					<?php unset($_SESSION['errorFound']); ?>
				</div>
			</div>
		</div>
		<div class="col-md-2"></div>
	</div>
</div>