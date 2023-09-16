# Generated by Django 4.2.4 on 2023-09-16 01:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Empresa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('cnpj', models.CharField(max_length=18)),
            ],
        ),
        migrations.CreateModel(
            name='Prestador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('empresa_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.empresa')),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('senha', models.CharField(max_length=32)),
                ('data_nascimento', models.DateField()),
                ('cpf', models.CharField(max_length=14)),
                ('tipo', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Servico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preco', models.FloatField()),
                ('duracao', models.DurationField()),
                ('id_categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.categoria')),
                ('id_prestador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.prestador')),
            ],
        ),
        migrations.AddField(
            model_name='prestador',
            name='usuario_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.usuario'),
        ),
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('endereco', models.CharField(max_length=200)),
                ('cidade', models.CharField(max_length=50)),
                ('estado', models.CharField(max_length=2)),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Agendamento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('horario_inicio', models.DateTimeField()),
                ('horario_fim', models.DateTimeField()),
                ('observacoes', models.TextField()),
                ('cliente_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.cliente')),
                ('servico_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.servico')),
            ],
        ),
    ]
