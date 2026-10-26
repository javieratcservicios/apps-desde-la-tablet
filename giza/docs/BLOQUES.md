# Catálogo de bloques

Generado de `assets/js/bloques.js` con `node tools/catalogo-md.js`. 872 bloques de Minecraft Java Edition 1.21, más 4 propios del mapa de Giza.

Columnas: dureza · resistencia a explosiones · herramienta · nivel mínimo para que suelte el bloque · luz (0–15) · arde · cae por gravedad · deja pasar la luz · se apila hasta · forma · versión en que apareció.

| Categoría | Bloques |
|---|---|
| Naturales | 23 |
| Piedra | 102 |
| Minerales | 39 |
| Madera | 105 |
| Colores | 148 |
| Cobre | 48 |
| Nether | 51 |
| End | 13 |
| Océano | 37 |
| Plantas | 71 |
| Luz | 37 |
| Redstone | 111 |
| Utilidad | 64 |
| Especiales | 23 |

## Naturales (23)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloque de hierba | `grass_block` | 0.6 | 0.6 | Pala | — | — | — | — | — | 64 | cubo | — |
| Tierra | `dirt` | 0.5 | 0.5 | Pala | — | — | — | — | — | 64 | cubo | — |
| Tierra estéril | `coarse_dirt` | 0.5 | 0.5 | Pala | — | — | — | — | — | 64 | cubo | — |
| Tierra enraizada | `rooted_dirt` | 0.5 | 0.5 | Pala | — | — | — | — | — | 64 | cubo | 1.17 |
| Podzol | `podzol` | 0.5 | 0.5 | Pala | — | — | — | — | — | 64 | cubo | — |
| Micelio | `mycelium` | 0.6 | 0.6 | Pala | — | — | — | — | — | 64 | cubo | — |
| Camino de tierra | `dirt_path` | 0.65 | 0.65 | Pala | — | — | — | — | — | 64 | camino | — |
| Tierra de cultivo | `farmland` | 0.6 | 0.6 | Pala | — | — | — | — | — | 64 | camino | — |
| Barro | `mud` | 0.5 | 0.5 | Pala | — | — | — | — | — | 64 | cubo | 1.19 |
| Arcilla | `clay` | 0.6 | 0.6 | Pala | — | — | — | — | — | 64 | cubo | — |
| Arena | `sand` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Arena roja | `red_sand` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Arena sospechosa | `suspicious_sand` | 0.25 | 0.25 | Pincel | — | — | — | Sí | — | 64 | cubo | 1.20 |
| Grava | `gravel` | 0.6 | 0.6 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Grava sospechosa | `suspicious_gravel` | 0.25 | 0.25 | Pincel | — | — | — | Sí | — | 64 | cubo | 1.20 |
| Bloque de nieve | `snow_block` | 0.2 | 0.2 | Pala | — | — | — | — | — | 64 | cubo | — |
| Capa de nieve | `snow` | 0.1 | 0.1 | Pala | — | — | — | — | Sí | 64 | capa | — |
| Nieve en polvo | `powder_snow` | 0.25 | 0.25 | — | — | — | — | — | Sí | 64 | cubo | 1.17 |
| Hielo | `ice` | 0.5 | 0.5 | Pico | — | — | — | — | Sí | 64 | cubo | — |
| Hielo compacto | `packed_ice` | 0.5 | 0.5 | Pico | — | — | — | — | — | 64 | cubo | — |
| Hielo azul | `blue_ice` | 2.8 | 2.8 | Pico | — | — | — | — | — | 64 | cubo | — |
| Bloque de musgo | `moss_block` | 0.1 | 0.1 | Azada | — | — | — | — | — | 64 | cubo | 1.17 |
| Bloque de musgo pálido | `pale_moss_block` | 0.1 | 0.1 | Azada | — | — | — | — | — | 64 | cubo | 1.21.4 |

- **Bloque de hierba:** Se extiende sola a la tierra cercana si hay luz.
- **Tierra estéril:** No le crece hierba.
- **Arena:** Cae si no tiene nada debajo.
- **Arena sospechosa:** Se cepilla con un pincel para encontrar objetos arqueológicos.
- **Nieve en polvo:** Te hundes en ella y te congela si no llevas botas de cuero.
- **Hielo:** Resbaladizo. Al romperlo sin toque de seda deja agua.
- **Hielo azul:** El más resbaladizo de todos.

## Piedra (102)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Barro compacto | `packed_mud` | 1 | 3 | Pico | — | — | — | — | — | 64 | cubo | 1.19 |
| Ladrillos de barro | `mud_bricks` | 1.5 | 3 | Pico | — | — | — | — | — | 64 | cubo | 1.19 |
| Piedra | `stone` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de piedra | `stone_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de piedra | `stone_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Roca | `cobblestone` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de roca | `cobblestone_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de roca | `cobblestone_stairs` | 2 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de roca | `cobblestone_wall` | 2 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Roca musgosa | `mossy_cobblestone` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Piedra lisa | `smooth_stone` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de piedra lisa | `smooth_stone_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Ladrillos de piedra | `stone_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de ladrillos de piedra | `stone_brick_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de ladrillos de piedra | `stone_brick_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de ladrillos de piedra | `stone_brick_wall` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Ladrillos de piedra musgosos | `mossy_stone_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de ladrillos de piedra musgosos | `mossy_stone_brick_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de ladrillos de piedra musgosos | `mossy_stone_brick_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de ladrillos de piedra musgosos | `mossy_stone_brick_wall` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Ladrillos de piedra agrietados | `cracked_stone_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Ladrillos de piedra cincelados | `chiseled_stone_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Granito | `granite` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de granito | `granite_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de granito | `granite_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de granito | `granite_wall` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Granito pulido | `polished_granite` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de granito pulido | `polished_granite_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de granito pulido | `polished_granite_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Diorita | `diorite` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de diorita | `diorite_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de diorita | `diorite_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de diorita | `diorite_wall` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Diorita pulida | `polished_diorite` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de diorita pulida | `polished_diorite_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de diorita pulida | `polished_diorite_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Andesita | `andesite` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de andesita | `andesite_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de andesita | `andesite_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de andesita | `andesite_wall` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Andesita pulida | `polished_andesite` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de andesita pulida | `polished_andesite_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de andesita pulida | `polished_andesite_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Pizarra profunda | `deepslate` | 3 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Pizarra profunda rocosa | `cobbled_deepslate` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Losa de pizarra profunda rocosa | `cobbled_deepslate_slab` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de pizarra profunda rocosa | `cobbled_deepslate_stairs` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | 1.17 |
| Muro de pizarra profunda rocosa | `cobbled_deepslate_wall` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | 1.17 |
| Pizarra profunda pulida | `polished_deepslate` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Losa de pizarra profunda pulida | `polished_deepslate_slab` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de pizarra profunda pulida | `polished_deepslate_stairs` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | 1.17 |
| Muro de pizarra profunda pulida | `polished_deepslate_wall` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | 1.17 |
| Ladrillos de pizarra profunda | `deepslate_bricks` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Losa de ladrillos de pizarra profunda | `deepslate_brick_slab` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de ladrillos de pizarra profunda | `deepslate_brick_stairs` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | 1.17 |
| Muro de ladrillos de pizarra profunda | `deepslate_brick_wall` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | 1.17 |
| Baldosas de pizarra profunda | `deepslate_tiles` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Losa de baldosas de pizarra profunda | `deepslate_tile_slab` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de baldosas de pizarra profunda | `deepslate_tile_stairs` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | 1.17 |
| Muro de baldosas de pizarra profunda | `deepslate_tile_wall` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | 1.17 |
| Pizarra profunda cincelada | `chiseled_deepslate` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Ladrillos de pizarra profunda agrietados | `cracked_deepslate_bricks` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Baldosas de pizarra profunda agrietadas | `cracked_deepslate_tiles` | 3.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Toba | `tuff` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de toba | `tuff_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de toba | `tuff_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de toba | `tuff_wall` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Ladrillos de toba | `tuff_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.21 |
| Toba pulida | `polished_tuff` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.21 |
| Toba cincelada | `chiseled_tuff` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.21 |
| Ladrillos de toba cincelados | `chiseled_tuff_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.21 |
| Calcita | `calcite` | 0.75 | 0.75 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Bloque de espeleotema | `dripstone_block` | 1.5 | 1 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Espeleotema puntiagudo | `pointed_dripstone` | 1.5 | 3 | Pico | madera | — | — | — | Sí | 64 | cruz | 1.17 |
| Ladrillos | `bricks` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de ladrillos | `brick_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de ladrillos | `brick_stairs` | 2 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de ladrillos | `brick_wall` | 2 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Losa de ladrillos de barro | `mud_brick_slab` | 1.5 | 3 | Pico | — | — | — | — | — | 64 | losa | 1.19 |
| Escaleras de ladrillos de barro | `mud_brick_stairs` | 1.5 | 3 | Pico | — | — | — | — | — | 64 | escalera | 1.19 |
| Muro de ladrillos de barro | `mud_brick_wall` | 1.5 | 3 | Pico | — | — | — | — | — | 64 | muro | 1.19 |
| Arenisca | `sandstone` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Arenisca cortada | `cut_sandstone` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Arenisca cincelada | `chiseled_sandstone` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Arenisca lisa | `smooth_sandstone` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de arenisca | `sandstone_slab` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de arenisca | `sandstone_stairs` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Losa de arenisca lisa | `smooth_sandstone_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de arenisca lisa | `smooth_sandstone_stairs` | 2 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Losa de arenisca cortada | `cut_sandstone_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Muro de arenisca | `sandstone_wall` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | muro | — |
| Arenisca roja | `red_sandstone` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Arenisca roja cortada | `red_cut_sandstone` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Arenisca roja cincelada | `red_chiseled_sandstone` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Arenisca roja lisa | `red_smooth_sandstone` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de arenisca roja | `red_sandstone_slab` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de arenisca roja | `red_sandstone_stairs` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Losa de arenisca roja lisa | `red_smooth_sandstone_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de arenisca roja lisa | `red_smooth_sandstone_stairs` | 2 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Losa de arenisca roja cortada | `red_cut_sandstone_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Muro de arenisca roja | `red_sandstone_wall` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | muro | — |
| Obsidiana | `obsidian` | 50 | 1200 | Pico | diamante | — | — | — | — | 64 | cubo | — |

- **Piedra:** Al picarla sin toque de seda suelta roca.
- **Espeleotema puntiagudo:** Si cae encima de alguien hace daño; gotea agua o lava.
- **Arenisca cincelada:** Lleva grabado un símbolo de creeper o de wither.
- **Arenisca roja cincelada:** Lleva grabado un símbolo de creeper o de wither.
- **Obsidiana:** Necesita pico de diamante. Con ella se construye el portal al Nether.

## Minerales (39)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mena de carbón | `coal_ore` | 3 | 3 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Mena de carbón de pizarra profunda | `deepslate_coal_ore` | 4.5 | 3 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Mena de hierro | `iron_ore` | 3 | 3 | Pico | piedra | — | — | — | — | 64 | cubo | — |
| Mena de hierro de pizarra profunda | `deepslate_iron_ore` | 4.5 | 3 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Mena de cobre | `copper_ore` | 3 | 3 | Pico | piedra | — | — | — | — | 64 | cubo | — |
| Mena de cobre de pizarra profunda | `deepslate_copper_ore` | 4.5 | 3 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Mena de oro | `gold_ore` | 3 | 3 | Pico | hierro | — | — | — | — | 64 | cubo | — |
| Mena de oro de pizarra profunda | `deepslate_gold_ore` | 4.5 | 3 | Pico | hierro | — | — | — | — | 64 | cubo | 1.17 |
| Mena de redstone | `redstone_ore` | 3 | 3 | Pico | hierro | — | — | — | — | 64 | cubo | — |
| Mena de redstone de pizarra profunda | `deepslate_redstone_ore` | 4.5 | 3 | Pico | hierro | — | — | — | — | 64 | cubo | 1.17 |
| Mena de esmeralda | `emerald_ore` | 3 | 3 | Pico | hierro | — | — | — | — | 64 | cubo | — |
| Mena de esmeralda de pizarra profunda | `deepslate_emerald_ore` | 4.5 | 3 | Pico | hierro | — | — | — | — | 64 | cubo | 1.17 |
| Mena de lapislázuli | `lapis_ore` | 3 | 3 | Pico | piedra | — | — | — | — | 64 | cubo | — |
| Mena de lapislázuli de pizarra profunda | `deepslate_lapis_ore` | 4.5 | 3 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Mena de diamante | `diamond_ore` | 3 | 3 | Pico | hierro | — | — | — | — | 64 | cubo | — |
| Mena de diamante de pizarra profunda | `deepslate_diamond_ore` | 4.5 | 3 | Pico | hierro | — | — | — | — | 64 | cubo | 1.17 |
| Mena de oro del Nether | `nether_gold_ore` | 3 | 3 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Mena de cuarzo del Nether | `nether_quartz_ore` | 3 | 3 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Escombros ancestrales | `ancient_debris` | 30 | 1200 | Pico | diamante | — | — | — | — | 64 | cubo | 1.16 |
| Bloque de carbón | `coal_block` | 5 | 6 | Pico | madera | — | Sí | — | — | 64 | cubo | — |
| Bloque de hierro | `iron_block` | 5 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | — |
| Bloque de oro | `gold_block` | 3 | 6 | Pico | hierro | — | — | — | — | 64 | cubo | — |
| Bloque de diamante | `diamond_block` | 5 | 6 | Pico | hierro | — | — | — | — | 64 | cubo | — |
| Bloque de esmeralda | `emerald_block` | 5 | 6 | Pico | hierro | — | — | — | — | 64 | cubo | — |
| Bloque de lapislázuli | `lapis_block` | 3 | 3 | Pico | piedra | — | — | — | — | 64 | cubo | — |
| Bloque de netherita | `netherite_block` | 50 | 1200 | Pico | diamante | — | — | — | — | 64 | cubo | — |
| Bloque de hierro en bruto | `raw_iron_block` | 5 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | — |
| Bloque de cobre en bruto | `raw_copper_block` | 5 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | — |
| Bloque de oro en bruto | `raw_gold_block` | 5 | 6 | Pico | hierro | — | — | — | — | 64 | cubo | — |
| Bloque de amatista | `amethyst_block` | 1.5 | 1.5 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Amatista con brotes | `budding_amethyst` | 1.5 | 1.5 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Bloque de cuarzo | `quartz_block` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cuarzo liso | `smooth_quartz` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Ladrillos de cuarzo | `quartz_bricks` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Pilar de cuarzo | `quartz_pillar` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Bloque de cuarzo cincelado | `chiseled_quartz_block` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de cuarzo | `quartz_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de cuarzo | `quartz_stairs` | 0.8 | 0.8 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Racimo de amatista | `amethyst_cluster` | 1.5 | 1.5 | Pico | — | 5 | — | — | Sí | 64 | cruz | 1.17 |

- **Mena de redstone:** Brilla (luz 9) unos segundos al tocarla.
- **Escombros ancestrales:** De aquí sale la netherita. No arde en lava.
- **Bloque de carbón:** Combustible: funde 80 objetos en un horno.
- **Bloque de oro:** Los piglins lo adoran.
- **Bloque de netherita:** No arde en lava.
- **Bloque de amatista:** Suena como campanillas al pisarlo.
- **Amatista con brotes:** Le crecen cristales de amatista. No se puede recoger.

## Madera (105)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tablones de roble | `oak_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de roble | `oak_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de roble descortezado | `stripped_oak_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de roble | `oak_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de roble descortezada | `stripped_oak_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Losa de roble | `oak_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | — |
| Escaleras de roble | `oak_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | — |
| Valla de roble | `oak_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Cartel de roble | `oak_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Cartel colgante de roble | `oak_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Tablones de abeto | `spruce_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de abeto | `spruce_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de abeto descortezado | `stripped_spruce_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de abeto | `spruce_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de abeto descortezada | `stripped_spruce_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Losa de abeto | `spruce_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | — |
| Escaleras de abeto | `spruce_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | — |
| Valla de abeto | `spruce_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Cartel de abeto | `spruce_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Cartel colgante de abeto | `spruce_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Tablones de abedul | `birch_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de abedul | `birch_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de abedul descortezado | `stripped_birch_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de abedul | `birch_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de abedul descortezada | `stripped_birch_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Losa de abedul | `birch_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | — |
| Escaleras de abedul | `birch_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | — |
| Valla de abedul | `birch_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Cartel de abedul | `birch_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Cartel colgante de abedul | `birch_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Tablones de jungla | `jungle_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de jungla | `jungle_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de jungla descortezado | `stripped_jungle_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de jungla | `jungle_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de jungla descortezada | `stripped_jungle_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Losa de jungla | `jungle_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | — |
| Escaleras de jungla | `jungle_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | — |
| Valla de jungla | `jungle_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Cartel de jungla | `jungle_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Cartel colgante de jungla | `jungle_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Tablones de acacia | `acacia_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de acacia | `acacia_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de acacia descortezado | `stripped_acacia_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de acacia | `acacia_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de acacia descortezada | `stripped_acacia_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Losa de acacia | `acacia_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | — |
| Escaleras de acacia | `acacia_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | — |
| Valla de acacia | `acacia_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Cartel de acacia | `acacia_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Cartel colgante de acacia | `acacia_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Tablones de roble oscuro | `dark_oak_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de roble oscuro | `dark_oak_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Tronco de roble oscuro descortezado | `stripped_dark_oak_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de roble oscuro | `dark_oak_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Madera de roble oscuro descortezada | `stripped_dark_oak_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Losa de roble oscuro | `dark_oak_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | — |
| Escaleras de roble oscuro | `dark_oak_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | — |
| Valla de roble oscuro | `dark_oak_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Cartel de roble oscuro | `dark_oak_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Cartel colgante de roble oscuro | `dark_oak_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Tablones de mangle | `mangrove_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.19 |
| Tronco de mangle | `mangrove_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.19 |
| Tronco de mangle descortezado | `stripped_mangrove_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.19 |
| Madera de mangle | `mangrove_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.19 |
| Madera de mangle descortezada | `stripped_mangrove_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.19 |
| Losa de mangle | `mangrove_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | 1.19 |
| Escaleras de mangle | `mangrove_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | 1.19 |
| Valla de mangle | `mangrove_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | 1.19 |
| Cartel de mangle | `mangrove_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | 1.19 |
| Cartel colgante de mangle | `mangrove_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | 1.19 |
| Tablones de cerezo | `cherry_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Tronco de cerezo | `cherry_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Tronco de cerezo descortezado | `stripped_cherry_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Madera de cerezo | `cherry_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Madera de cerezo descortezada | `stripped_cherry_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Losa de cerezo | `cherry_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | 1.20 |
| Escaleras de cerezo | `cherry_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | 1.20 |
| Valla de cerezo | `cherry_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | 1.20 |
| Cartel de cerezo | `cherry_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | 1.20 |
| Cartel colgante de cerezo | `cherry_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | 1.20 |
| Tablones de roble pálido | `pale_oak_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.21.4 |
| Tronco de roble pálido | `pale_oak_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.21.4 |
| Tronco de roble pálido descortezado | `stripped_pale_oak_log` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.21.4 |
| Madera de roble pálido | `pale_oak_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.21.4 |
| Madera de roble pálido descortezada | `stripped_pale_oak_wood` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.21.4 |
| Losa de roble pálido | `pale_oak_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | 1.21.4 |
| Escaleras de roble pálido | `pale_oak_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | 1.21.4 |
| Valla de roble pálido | `pale_oak_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | 1.21.4 |
| Cartel de roble pálido | `pale_oak_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | 1.21.4 |
| Cartel colgante de roble pálido | `pale_oak_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | 1.21.4 |
| Tablones de bambú | `bamboo_planks` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Bloque de bambú | `bamboo_block` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Bloque de bambú descortezado | `stripped_bamboo_block` | 2 | 2 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Mosaico de bambú | `bamboo_mosaic` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |
| Losa de bambú | `bamboo_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | 1.20 |
| Escaleras de bambú | `bamboo_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | 1.20 |
| Valla de bambú | `bamboo_fence` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | 1.20 |
| Cartel de bambú | `bamboo_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | 1.20 |
| Cartel colgante de bambú | `bamboo_hanging_sign` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | 1.20 |
| Losa de mosaico de bambú | `bamboo_mosaic_slab` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | losa | 1.20 |
| Escaleras de mosaico de bambú | `bamboo_mosaic_stairs` | 2 | 3 | Hacha | — | — | Sí | — | — | 64 | escalera | 1.20 |
| Raíces de mangle | `mangrove_roots` | 0.7 | 0.7 | Hacha | — | — | Sí | — | Sí | 64 | hojas | 1.19 |
| Raíces de mangle embarradas | `muddy_mangrove_roots` | 0.7 | 0.7 | Pala | — | — | — | — | — | 64 | cubo | 1.19 |
| Librería | `bookshelf` | 1.5 | 1.5 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Librería cincelada | `chiseled_bookshelf` | 1.5 | 1.5 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.20 |

- **Librería:** Sube el nivel de la mesa de encantamientos.

## Colores (148)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lana blanca | `white_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra blanca | `white_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón blanco | `white_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento blanco | `white_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota blanca | `white_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada blanca | `white_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado blanco | `white_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado blanco | `white_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte blanco | `white_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana naranja | `orange_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra naranja | `orange_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón naranja | `orange_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento naranja | `orange_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota naranja | `orange_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada naranja | `orange_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado naranja | `orange_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado naranja | `orange_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte naranja | `orange_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana magenta | `magenta_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra magenta | `magenta_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón magenta | `magenta_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento magenta | `magenta_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota magenta | `magenta_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada magenta | `magenta_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado magenta | `magenta_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado magenta | `magenta_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte magenta | `magenta_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana azul claro | `light_blue_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra azul claro | `light_blue_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón azul claro | `light_blue_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento azul claro | `light_blue_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota azul claro | `light_blue_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada azul claro | `light_blue_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado azul claro | `light_blue_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado azul claro | `light_blue_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte azul claro | `light_blue_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana amarilla | `yellow_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra amarilla | `yellow_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón amarillo | `yellow_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento amarillo | `yellow_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota amarilla | `yellow_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada amarilla | `yellow_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado amarillo | `yellow_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado amarillo | `yellow_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte amarillo | `yellow_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana verde lima | `lime_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra verde lima | `lime_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón verde lima | `lime_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento verde lima | `lime_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota verde lima | `lime_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada verde lima | `lime_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado verde lima | `lime_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado verde lima | `lime_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte verde lima | `lime_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana rosa | `pink_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra rosa | `pink_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón rosa | `pink_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento rosa | `pink_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota rosa | `pink_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada rosa | `pink_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado rosa | `pink_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado rosa | `pink_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte rosa | `pink_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana gris | `gray_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra gris | `gray_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón gris | `gray_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento gris | `gray_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota gris | `gray_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada gris | `gray_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado gris | `gray_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado gris | `gray_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte gris | `gray_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana gris claro | `light_gray_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra gris claro | `light_gray_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón gris claro | `light_gray_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento gris claro | `light_gray_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota gris claro | `light_gray_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada gris claro | `light_gray_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado gris claro | `light_gray_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado gris claro | `light_gray_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte gris claro | `light_gray_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana cian | `cyan_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra cian | `cyan_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón cian | `cyan_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento cian | `cyan_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota cian | `cyan_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada cian | `cyan_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado cian | `cyan_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado cian | `cyan_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte cian | `cyan_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana morada | `purple_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra morada | `purple_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón morado | `purple_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento morado | `purple_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota morada | `purple_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada morada | `purple_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado morado | `purple_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado morado | `purple_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte morado | `purple_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana azul | `blue_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra azul | `blue_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón azul | `blue_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento azul | `blue_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota azul | `blue_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada azul | `blue_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado azul | `blue_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado azul | `blue_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte azul | `blue_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana marrón | `brown_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra marrón | `brown_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón marrón | `brown_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento marrón | `brown_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota marrón | `brown_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada marrón | `brown_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado marrón | `brown_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado marrón | `brown_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte marrón | `brown_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana verde | `green_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra verde | `green_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón verde | `green_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento verde | `green_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota verde | `green_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada verde | `green_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado verde | `green_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado verde | `green_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte verde | `green_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana roja | `red_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra roja | `red_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón rojo | `red_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento rojo | `red_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota roja | `red_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada roja | `red_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado rojo | `red_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado rojo | `red_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte rojo | `red_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Lana negra | `black_wool` | 0.8 | 0.8 | Tijeras | — | — | Sí | — | — | 64 | cubo | — |
| Alfombra negra | `black_carpet` | 0.1 | 0.1 | — | — | — | Sí | — | Sí | 64 | alfombra | — |
| Hormigón negro | `black_concrete` | 1.8 | 1.8 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cemento negro | `black_concrete_powder` | 0.5 | 0.5 | Pala | — | — | — | Sí | — | 64 | cubo | — |
| Terracota negra | `black_terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Terracota esmaltada negra | `black_glazed_terracotta` | 1.4 | 1.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal tintado negro | `black_stained_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal tintado negro | `black_stained_glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Estandarte negro | `black_banner` | 1 | 1 | Hacha | — | — | Sí | — | Sí | 16 | cartel | — |
| Terracota | `terracotta` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Cristal | `glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | — |
| Panel de cristal | `glass_pane` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | panel | — |
| Cristal opaco | `tinted_glass` | 0.3 | 0.3 | — | — | — | — | — | Sí | 64 | cristal | 1.17 |

- **Cemento blanco:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada blanca:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado blanco:** Sin toque de seda se rompe sin soltar nada.
- **Cemento naranja:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada naranja:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado naranja:** Sin toque de seda se rompe sin soltar nada.
- **Cemento magenta:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada magenta:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado magenta:** Sin toque de seda se rompe sin soltar nada.
- **Cemento azul claro:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada azul claro:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado azul claro:** Sin toque de seda se rompe sin soltar nada.
- **Cemento amarillo:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada amarilla:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado amarillo:** Sin toque de seda se rompe sin soltar nada.
- **Cemento verde lima:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada verde lima:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado verde lima:** Sin toque de seda se rompe sin soltar nada.
- **Cemento rosa:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada rosa:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado rosa:** Sin toque de seda se rompe sin soltar nada.
- **Cemento gris:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada gris:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado gris:** Sin toque de seda se rompe sin soltar nada.
- **Cemento gris claro:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada gris claro:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado gris claro:** Sin toque de seda se rompe sin soltar nada.
- **Cemento cian:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada cian:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado cian:** Sin toque de seda se rompe sin soltar nada.
- **Cemento morado:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada morada:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado morado:** Sin toque de seda se rompe sin soltar nada.
- **Cemento azul:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada azul:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado azul:** Sin toque de seda se rompe sin soltar nada.
- **Cemento marrón:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada marrón:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado marrón:** Sin toque de seda se rompe sin soltar nada.
- **Cemento verde:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada verde:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado verde:** Sin toque de seda se rompe sin soltar nada.
- **Cemento rojo:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada roja:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado rojo:** Sin toque de seda se rompe sin soltar nada.
- **Cemento negro:** Se vuelve hormigón al tocar agua.
- **Terracota esmaltada negra:** No se pega a los bloques de slime ni de miel.
- **Cristal tintado negro:** Sin toque de seda se rompe sin soltar nada.
- **Cristal opaco:** Deja pasar la vista pero no la luz.

## Cobre (48)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloque de cobre | `copper_block` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Cobre cortado | `cut_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Losa de cobre cortado | `cut_copper_slab` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de cobre cortado | `cut_copper_stairs` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | escalera | 1.17 |
| Cobre cincelado | `chiseled_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.21 |
| Rejilla de cobre | `copper_grate` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cristal | 1.21 |
| Bloque de cobre encerado | `waxed_copper_block` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Cobre cortado encerado | `waxed_cut_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Losa de cobre cortado encerado | `waxed_cut_copper_slab` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de cobre cortado encerado | `waxed_cut_copper_stairs` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | escalera | 1.17 |
| Cobre cincelado encerado | `waxed_chiseled_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.21 |
| Rejilla de cobre encerado | `waxed_copper_grate` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cristal | 1.21 |
| Bloque de cobre expuesto | `exposed_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Cobre cortado expuesto | `exposed_cut_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Losa de cobre cortado expuesto | `exposed_cut_copper_slab` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de cobre cortado expuesto | `exposed_cut_copper_stairs` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | escalera | 1.17 |
| Cobre cincelado expuesto | `exposed_chiseled_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.21 |
| Rejilla de cobre expuesto | `exposed_copper_grate` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cristal | 1.21 |
| Bloque de cobre expuesto encerado | `waxed_exposed_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Cobre cortado expuesto encerado | `waxed_exposed_cut_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Losa de cobre cortado expuesto encerado | `waxed_exposed_cut_copper_slab` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de cobre cortado expuesto encerado | `waxed_exposed_cut_copper_stairs` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | escalera | 1.17 |
| Cobre cincelado expuesto encerado | `waxed_exposed_chiseled_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.21 |
| Rejilla de cobre expuesto encerado | `waxed_exposed_copper_grate` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cristal | 1.21 |
| Bloque de cobre erosionado | `weathered_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Cobre cortado erosionado | `weathered_cut_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Losa de cobre cortado erosionado | `weathered_cut_copper_slab` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de cobre cortado erosionado | `weathered_cut_copper_stairs` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | escalera | 1.17 |
| Cobre cincelado erosionado | `weathered_chiseled_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.21 |
| Rejilla de cobre erosionado | `weathered_copper_grate` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cristal | 1.21 |
| Bloque de cobre erosionado encerado | `waxed_weathered_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Cobre cortado erosionado encerado | `waxed_weathered_cut_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Losa de cobre cortado erosionado encerado | `waxed_weathered_cut_copper_slab` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de cobre cortado erosionado encerado | `waxed_weathered_cut_copper_stairs` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | escalera | 1.17 |
| Cobre cincelado erosionado encerado | `waxed_weathered_chiseled_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.21 |
| Rejilla de cobre erosionado encerado | `waxed_weathered_copper_grate` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cristal | 1.21 |
| Bloque de cobre oxidado | `oxidized_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Cobre cortado oxidado | `oxidized_cut_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Losa de cobre cortado oxidado | `oxidized_cut_copper_slab` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de cobre cortado oxidado | `oxidized_cut_copper_stairs` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | escalera | 1.17 |
| Cobre cincelado oxidado | `oxidized_chiseled_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.21 |
| Rejilla de cobre oxidado | `oxidized_copper_grate` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cristal | 1.21 |
| Bloque de cobre oxidado encerado | `waxed_oxidized_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Cobre cortado oxidado encerado | `waxed_oxidized_cut_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.17 |
| Losa de cobre cortado oxidado encerado | `waxed_oxidized_cut_copper_slab` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | losa | 1.17 |
| Escaleras de cobre cortado oxidado encerado | `waxed_oxidized_cut_copper_stairs` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | escalera | 1.17 |
| Cobre cincelado oxidado encerado | `waxed_oxidized_chiseled_copper` | 3 | 6 | Pico | piedra | — | — | — | — | 64 | cubo | 1.21 |
| Rejilla de cobre oxidado encerado | `waxed_oxidized_copper_grate` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cristal | 1.21 |

- **Bloque de cobre:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Cobre cortado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Losa de cobre cortado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Escaleras de cobre cortado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Cobre cincelado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Rejilla de cobre:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Bloque de cobre encerado:** La cera evita que se oxide.
- **Cobre cortado encerado:** La cera evita que se oxide.
- **Losa de cobre cortado encerado:** La cera evita que se oxide.
- **Escaleras de cobre cortado encerado:** La cera evita que se oxide.
- **Cobre cincelado encerado:** La cera evita que se oxide.
- **Rejilla de cobre encerado:** La cera evita que se oxide.
- **Bloque de cobre expuesto:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Cobre cortado expuesto:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Losa de cobre cortado expuesto:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Escaleras de cobre cortado expuesto:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Cobre cincelado expuesto:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Rejilla de cobre expuesto:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Bloque de cobre expuesto encerado:** La cera evita que se oxide.
- **Cobre cortado expuesto encerado:** La cera evita que se oxide.
- **Losa de cobre cortado expuesto encerado:** La cera evita que se oxide.
- **Escaleras de cobre cortado expuesto encerado:** La cera evita que se oxide.
- **Cobre cincelado expuesto encerado:** La cera evita que se oxide.
- **Rejilla de cobre expuesto encerado:** La cera evita que se oxide.
- **Bloque de cobre erosionado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Cobre cortado erosionado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Losa de cobre cortado erosionado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Escaleras de cobre cortado erosionado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Cobre cincelado erosionado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Rejilla de cobre erosionado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Bloque de cobre erosionado encerado:** La cera evita que se oxide.
- **Cobre cortado erosionado encerado:** La cera evita que se oxide.
- **Losa de cobre cortado erosionado encerado:** La cera evita que se oxide.
- **Escaleras de cobre cortado erosionado encerado:** La cera evita que se oxide.
- **Cobre cincelado erosionado encerado:** La cera evita que se oxide.
- **Rejilla de cobre erosionado encerado:** La cera evita que se oxide.
- **Bloque de cobre oxidado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Cobre cortado oxidado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Losa de cobre cortado oxidado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Escaleras de cobre cortado oxidado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Cobre cincelado oxidado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Rejilla de cobre oxidado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Bloque de cobre oxidado encerado:** La cera evita que se oxide.
- **Cobre cortado oxidado encerado:** La cera evita que se oxide.
- **Losa de cobre cortado oxidado encerado:** La cera evita que se oxide.
- **Escaleras de cobre cortado oxidado encerado:** La cera evita que se oxide.
- **Cobre cincelado oxidado encerado:** La cera evita que se oxide.
- **Rejilla de cobre oxidado encerado:** La cera evita que se oxide.

## Nether (51)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tablones de carmesí | `crimson_planks` | 2 | 3 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Tallo de carmesí | `crimson_stem` | 2 | 2 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Tallo de carmesí descortezado | `stripped_crimson_stem` | 2 | 2 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Hifas de carmesí | `crimson_hyphae` | 2 | 2 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Hifas de carmesí descortezadas | `stripped_crimson_hyphae` | 2 | 2 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Losa de carmesí | `crimson_slab` | 2 | 3 | Hacha | — | — | — | — | — | 64 | losa | 1.16 |
| Escaleras de carmesí | `crimson_stairs` | 2 | 3 | Hacha | — | — | — | — | — | 64 | escalera | 1.16 |
| Valla de carmesí | `crimson_fence` | 2 | 3 | Hacha | — | — | — | — | Sí | 64 | valla | 1.16 |
| Cartel de carmesí | `crimson_sign` | 1 | 1 | Hacha | — | — | — | — | Sí | 16 | cartel | 1.16 |
| Cartel colgante de carmesí | `crimson_hanging_sign` | 1 | 1 | Hacha | — | — | — | — | Sí | 16 | cartel | 1.16 |
| Tablones de distorsionado | `warped_planks` | 2 | 3 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Tallo de distorsionado | `warped_stem` | 2 | 2 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Tallo de distorsionado descortezado | `stripped_warped_stem` | 2 | 2 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Hifas de distorsionado | `warped_hyphae` | 2 | 2 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Hifas de distorsionado descortezadas | `stripped_warped_hyphae` | 2 | 2 | Hacha | — | — | — | — | — | 64 | cubo | 1.16 |
| Losa de distorsionado | `warped_slab` | 2 | 3 | Hacha | — | — | — | — | — | 64 | losa | 1.16 |
| Escaleras de distorsionado | `warped_stairs` | 2 | 3 | Hacha | — | — | — | — | — | 64 | escalera | 1.16 |
| Valla de distorsionado | `warped_fence` | 2 | 3 | Hacha | — | — | — | — | Sí | 64 | valla | 1.16 |
| Cartel de distorsionado | `warped_sign` | 1 | 1 | Hacha | — | — | — | — | Sí | 16 | cartel | 1.16 |
| Cartel colgante de distorsionado | `warped_hanging_sign` | 1 | 1 | Hacha | — | — | — | — | Sí | 16 | cartel | 1.16 |
| Netherrack | `netherrack` | 0.4 | 0.4 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Ladrillos del Nether | `nether_bricks` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Ladrillos del Nether agrietados | `cracked_nether_bricks` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Ladrillos del Nether cincelados | `chiseled_nether_bricks` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Ladrillos rojos del Nether | `red_nether_bricks` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Basalto | `basalt` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Basalto pulido | `polished_basalt` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Basalto liso | `smooth_basalt` | 1.25 | 4.2 | Pico | madera | — | — | — | — | 64 | cubo | 1.17 |
| Piedra negra | `blackstone` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Piedra negra dorada | `gilded_blackstone` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Piedra negra pulida | `polished_blackstone` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Ladrillos de piedra negra pulida | `polished_blackstone_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Ladrillos de piedra negra pulida agrietados | `cracked_polished_blackstone_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Piedra negra pulida cincelada | `chiseled_polished_blackstone` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Arena de almas | `soul_sand` | 0.5 | 0.5 | Pala | madera | — | — | — | — | 64 | cubo | — |
| Tierra de almas | `soul_soil` | 0.5 | 0.5 | Pala | madera | — | — | — | — | 64 | cubo | 1.16 |
| Bloque de magma | `magma_block` | 0.5 | 0.5 | Pico | madera | 3 | — | — | — | 64 | cubo | — |
| Bloque de verruga del Nether | `nether_wart_block` | 1 | 1 | Azada | madera | — | — | — | — | 64 | cubo | — |
| Bloque de verruga distorsionada | `warped_wart_block` | 1 | 1 | Azada | madera | — | — | — | — | 64 | cubo | 1.16 |
| Necelio carmesí | `crimson_nylium` | 0.4 | 0.4 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Necelio distorsionado | `warped_nylium` | 0.4 | 0.4 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Brillongo | `shroomlight` | 1 | 1 | Azada | madera | 15 | — | — | — | 64 | cubo | 1.16 |
| Piedra luminosa | `glowstone` | 0.3 | 0.3 | Pico | madera | 15 | — | — | — | 64 | cubo | — |
| Obsidiana llorosa | `crying_obsidian` | 50 | 1200 | Pico | diamante | 10 | — | — | — | 64 | cubo | 1.16 |
| Hongo carmesí | `crimson_fungus` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.16 |
| Hongo distorsionado | `warped_fungus` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.16 |
| Raíces carmesíes | `crimson_roots` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.16 |
| Raíces distorsionadas | `warped_roots` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.16 |
| Brotes del Nether | `nether_sprouts` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.16 |
| Enredaderas lloronas | `weeping_vines` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.16 |
| Enredaderas retorcidas | `twisting_vines` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.16 |

- **Netherrack:** Arde para siempre si se le prende fuego.
- **Arena de almas:** Te hace ir más lento. Bajo el agua crea burbujas que suben.
- **Bloque de magma:** Quema al pisarlo sin andar agachado.
- **Piedra luminosa:** Suelta polvo de piedra luminosa al romperla.

## End (13)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Piedra del End | `end_stone` | 3 | 9 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Ladrillos de piedra del End | `end_stone_bricks` | 3 | 9 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de ladrillos de piedra del End | `end_stone_brick_slab` | 3 | 9 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de ladrillos de piedra del End | `end_stone_brick_stairs` | 3 | 9 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de ladrillos de piedra del End | `end_stone_brick_wall` | 3 | 9 | Pico | madera | — | — | — | — | 64 | muro | — |
| Bloque de púrpura | `purpur_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Pilar de púrpura | `purpur_pillar` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Losa de púrpura | `purpur_slab` | 2 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de púrpura | `purpur_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Planta de coro | `chorus_plant` | 0.4 | 0.4 | Hacha | — | — | — | — | Sí | 64 | hojas | — |
| Flor de coro | `chorus_flower` | 0.4 | 0.4 | Hacha | — | — | — | — | — | 64 | cubo | — |
| Huevo de dragón | `dragon_egg` | 3 | 9 | — | — | 1 | — | Sí | Sí | 64 | huevo | — |
| Marco del portal del End | `end_portal_frame` | ∞ | 3.6 M | — | — | 1 | — | — | — | 64 | camino | — |

- **Huevo de dragón:** Solo hay uno por mundo. Se teletransporta si lo golpeas.

## Océano (37)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Prismarina | `prismarine` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Ladrillos de prismarina | `prismarine_bricks` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Prismarina oscura | `dark_prismarine` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Esponja | `sponge` | 0.6 | 0.6 | Azada | madera | — | — | — | — | 64 | cubo | — |
| Esponja mojada | `wet_sponge` | 0.6 | 0.6 | Azada | madera | — | — | — | — | 64 | cubo | — |
| Bloque de algas secas | `dried_kelp_block` | 0.5 | 2.5 | Azada | madera | — | Sí | — | — | 64 | cubo | — |
| Losa de prismarina | `prismarine_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de prismarina | `prismarine_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Losa de ladrillos de prismarina | `prismarine_brick_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de ladrillos de prismarina | `prismarine_brick_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Losa de prismarina oscura | `dark_prismarine_slab` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | losa | — |
| Escaleras de prismarina oscura | `dark_prismarine_stairs` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | escalera | — |
| Muro de prismarina | `prismarine_wall` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | muro | — |
| Bloque de coral de tubo | `tube_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Bloque de coral de tubo muerto | `dead_tube_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Coral de tubo | `tube_coral` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Abanico de coral de tubo | `tube_coral_fan` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Bloque de coral de cerebro | `brain_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Bloque de coral de cerebro muerto | `dead_brain_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Coral de cerebro | `brain_coral` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Abanico de coral de cerebro | `brain_coral_fan` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Bloque de coral de burbuja | `bubble_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Bloque de coral de burbuja muerto | `dead_bubble_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Coral de burbuja | `bubble_coral` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Abanico de coral de burbuja | `bubble_coral_fan` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Bloque de coral de fuego | `fire_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Bloque de coral de fuego muerto | `dead_fire_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Coral de fuego | `fire_coral` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Abanico de coral de fuego | `fire_coral_fan` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Bloque de coral de cuerno | `horn_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Bloque de coral de cuerno muerto | `dead_horn_coral_block` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Coral de cuerno | `horn_coral` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Abanico de coral de cuerno | `horn_coral_fan` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Pepinillo de mar | `sea_pickle` | 0 | 0 | — | — | 6 | — | — | Sí | 64 | cruz | — |
| Alga | `kelp` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Pasto marino | `seagrass` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Canalizador | `conduit` | 3 | 3 | Pico | — | 15 | — | — | Sí | 64 | farol | — |

- **Esponja:** Absorbe el agua alrededor.
- **Esponja mojada:** Se seca en un horno o en el Nether.
- **Bloque de coral de tubo:** Muere y se vuelve gris fuera del agua.
- **Bloque de coral de cerebro:** Muere y se vuelve gris fuera del agua.
- **Bloque de coral de burbuja:** Muere y se vuelve gris fuera del agua.
- **Bloque de coral de fuego:** Muere y se vuelve gris fuera del agua.
- **Bloque de coral de cuerno:** Muere y se vuelve gris fuera del agua.
- **Pepinillo de mar:** Bajo el agua da luz 6, 9, 12 o 15 según cuántos haya.

## Plantas (71)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hojas de roble | `oak_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | — |
| Brote de roble | `oak_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | — |
| Hojas de abeto | `spruce_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | — |
| Brote de abeto | `spruce_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | — |
| Hojas de abedul | `birch_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | — |
| Brote de abedul | `birch_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | — |
| Hojas de jungla | `jungle_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | — |
| Brote de jungla | `jungle_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | — |
| Hojas de acacia | `acacia_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | — |
| Brote de acacia | `acacia_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | — |
| Hojas de roble oscuro | `dark_oak_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | — |
| Brote de roble oscuro | `dark_oak_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | — |
| Hojas de mangle | `mangrove_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | 1.19 |
| Propágulo de mangle | `mangrove_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | 1.19 |
| Hojas de cerezo | `cherry_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | 1.20 |
| Brote de cerezo | `cherry_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | 1.20 |
| Hojas de roble pálido | `pale_oak_leaves` | 0.2 | 0.2 | Azada | — | — | Sí | — | Sí | 64 | hojas | 1.21.4 |
| Brote de roble pálido | `pale_oak_sapling` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | cruz | 1.21.4 |
| Hierba | `short_grass` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Hierba alta | `tall_grass` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Helecho | `fern` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Arbusto muerto | `dead_bush` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Diente de león | `dandelion` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Amapola | `poppy` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Orquídea azul | `blue_orchid` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Allium | `allium` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Rubiácea | `azure_bluet` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Tulipán rojo | `red_tulip` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Tulipán naranja | `orange_tulip` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Tulipán blanco | `white_tulip` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Tulipán rosa | `pink_tulip` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Margarita | `oxeye_daisy` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Aciano | `cornflower` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Lirio de los valles | `lily_of_the_valley` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Rosa del wither | `wither_rose` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Girasol | `sunflower` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Lila | `lilac` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Rosal | `rose_bush` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Peonía | `peony` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Flor antorcha | `torchflower` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.20 |
| Planta jarra | `pitcher_plant` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.20 |
| Pétalos rosas | `pink_petals` | 0 | 0 | — | — | — | — | — | Sí | 64 | alfombra | 1.20 |
| Champiñón marrón | `brown_mushroom` | 0 | 0 | — | — | 1 | — | — | Sí | 64 | cruz | — |
| Champiñón rojo | `red_mushroom` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Caña de azúcar | `sugar_cane` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Cactus | `cactus` | 0.4 | 0.4 | — | — | — | — | — | — | 64 | cactus | — |
| Bambú | `bamboo` | 1 | 1 | Hacha | — | — | — | — | Sí | 64 | cruz | 1.14 |
| Enredadera | `vine` | 0 | 0 | Tijeras | — | — | — | — | Sí | 64 | cruz | — |
| Liquen luminoso | `glow_lichen` | 0 | 0 | — | — | 7 | — | — | Sí | 64 | cruz | 1.17 |
| Nenúfar | `lily_pad` | 0 | 0 | — | — | — | — | — | Sí | 64 | alfombra | — |
| Arbusto de bayas dulces | `sweet_berry_bush` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Trigo | `wheat` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Zanahorias | `carrots` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Papas | `potatoes` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Remolachas | `beetroots` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | — |
| Azalea | `azalea` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.17 |
| Azalea florida | `flowering_azalea` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.17 |
| Flor de esporas | `spore_blossom` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.17 |
| Raíces colgantes | `hanging_roots` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.17 |
| Plantaforma grande | `big_dripleaf` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.17 |
| Plantaforma pequeña | `small_dripleaf` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.17 |
| Enredaderas de cueva | `cave_vines` | 0 | 0 | — | — | 14 | — | — | Sí | 64 | cruz | 1.17 |
| Telaraña | `cobweb` | 4 | 4 | Espada | — | — | — | — | Sí | 64 | cruz | — |
| Ojo florido abierto | `open_eyeblossom` | 0 | 0 | — | — | — | — | — | Sí | 64 | cruz | 1.21.4 |
| Calabaza | `pumpkin` | 1 | 1 | Hacha | — | — | — | — | — | 64 | cubo | — |
| Calabaza tallada | `carved_pumpkin` | 1 | 1 | Hacha | — | — | — | — | — | 64 | cubo | — |
| Sandía | `melon` | 1 | 1 | Hacha | — | — | — | — | — | 64 | cubo | — |
| Fardo de heno | `hay_block` | 0.5 | 0.5 | Azada | — | — | Sí | — | — | 64 | cubo | — |
| Bloque de champiñón marrón | `brown_mushroom_block` | 0.2 | 0.2 | Hacha | — | — | — | — | — | 64 | cubo | — |
| Bloque de champiñón rojo | `red_mushroom_block` | 0.2 | 0.2 | Hacha | — | — | — | — | — | 64 | cubo | — |
| Tallo de champiñón | `mushroom_stem` | 0.2 | 0.2 | Hacha | — | — | — | — | — | 64 | cubo | — |

- **Hojas de roble:** Se deshacen solas si no están cerca de un tronco.
- **Hojas de abeto:** Se deshacen solas si no están cerca de un tronco.
- **Hojas de abedul:** Se deshacen solas si no están cerca de un tronco.
- **Hojas de jungla:** Se deshacen solas si no están cerca de un tronco.
- **Hojas de acacia:** Se deshacen solas si no están cerca de un tronco.
- **Hojas de roble oscuro:** Se deshacen solas si no están cerca de un tronco.
- **Hojas de mangle:** Se deshacen solas si no están cerca de un tronco.
- **Hojas de cerezo:** Se deshacen solas si no están cerca de un tronco.
- **Hojas de roble pálido:** Se deshacen solas si no están cerca de un tronco.
- **Arbusto muerto:** Típico del desierto; sale de la arena.
- **Rosa del wither:** Envenena con efecto wither a quien la toque.
- **Caña de azúcar:** Crece junto al agua hasta 3 bloques.
- **Cactus:** Pincha. Solo crece sobre arena.
- **Trigo:** Cultivo: tarda unos minutos en madurar.
- **Enredaderas de cueva:** Con bayas luminosas da luz 14.
- **Telaraña:** Frena mucho. Se rompe rápido con espada o tijeras.
- **Fardo de heno:** Amortigua las caídas un 80 %.

## Luz (37)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vela blanca | `white_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela naranja | `orange_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela magenta | `magenta_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela azul claro | `light_blue_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela amarilla | `yellow_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela verde lima | `lime_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela rosa | `pink_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela gris | `gray_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela gris claro | `light_gray_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela cian | `cyan_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela morada | `purple_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela azul | `blue_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela marrón | `brown_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela verde | `green_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela roja | `red_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela negra | `black_candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Vela | `candle` | 0.1 | 0.1 | — | — | 3 | — | — | Sí | 64 | cruz | 1.17 |
| Bombilla de cobre | `copper_bulb` | 3 | 6 | Pico | piedra | 15 | — | — | — | 64 | cubo | 1.21 |
| Bombilla de cobre encerado | `waxed_copper_bulb` | 3 | 6 | Pico | piedra | 15 | — | — | — | 64 | cubo | 1.21 |
| Bombilla de cobre expuesto | `exposed_copper_bulb` | 3 | 6 | Pico | piedra | 12 | — | — | — | 64 | cubo | 1.21 |
| Bombilla de cobre expuesto encerado | `waxed_exposed_copper_bulb` | 3 | 6 | Pico | piedra | 12 | — | — | — | 64 | cubo | 1.21 |
| Bombilla de cobre erosionado | `weathered_copper_bulb` | 3 | 6 | Pico | piedra | 8 | — | — | — | 64 | cubo | 1.21 |
| Bombilla de cobre erosionado encerado | `waxed_weathered_copper_bulb` | 3 | 6 | Pico | piedra | 8 | — | — | — | 64 | cubo | 1.21 |
| Bombilla de cobre oxidado | `oxidized_copper_bulb` | 3 | 6 | Pico | piedra | 4 | — | — | — | 64 | cubo | 1.21 |
| Bombilla de cobre oxidado encerado | `waxed_oxidized_copper_bulb` | 3 | 6 | Pico | piedra | 4 | — | — | — | 64 | cubo | 1.21 |
| Vara del End | `end_rod` | 0 | 0 | — | — | 14 | — | — | Sí | 64 | cruz | — |
| Linterna de mar | `sea_lantern` | 0.3 | 0.3 | — | madera | 15 | — | — | — | 64 | cubo | — |
| Antorcha | `torch` | 0 | 1 | — | — | 14 | — | — | Sí | 64 | cruz | — |
| Antorcha de almas | `soul_torch` | 0 | 1 | — | — | 10 | — | — | Sí | 64 | cruz | 1.16 |
| Farol | `lantern` | 3.5 | 3.5 | Pico | — | 15 | — | — | Sí | 64 | farol | 1.14 |
| Farol de almas | `soul_lantern` | 3.5 | 3.5 | Pico | — | 10 | — | — | Sí | 64 | farol | 1.16 |
| Calabaza iluminada | `jack_o_lantern` | 1 | 1 | Hacha | — | 15 | — | — | — | 64 | cubo | — |
| Luz de rana ocre | `ochre_froglight` | 0.3 | 0.3 | — | — | 15 | — | — | — | 64 | cubo | 1.19 |
| Luz de rana verde | `verdant_froglight` | 0.3 | 0.3 | — | — | 15 | — | — | — | 64 | cubo | 1.19 |
| Luz de rana perlada | `pearlescent_froglight` | 0.3 | 0.3 | — | — | 15 | — | — | — | 64 | cubo | 1.19 |
| Fogata | `campfire` | 2 | 2 | Hacha | — | 15 | — | — | Sí | 64 | losa | 1.14 |
| Fogata de almas | `soul_campfire` | 2 | 2 | Hacha | — | 10 | — | — | Sí | 64 | losa | 1.16 |

- **Vela blanca:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela naranja:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela magenta:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela azul claro:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela amarilla:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela verde lima:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela rosa:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela gris:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela gris claro:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela cian:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela morada:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela azul:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela marrón:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela verde:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela roja:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Vela negra:** Luz 3 por vela encendida; hasta 4 en un bloque (luz 12).
- **Bombilla de cobre:** Se enciende y apaga con cada pulso de redstone. Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Bombilla de cobre encerado:** Se enciende y apaga con cada pulso de redstone. La cera evita que se oxide.
- **Bombilla de cobre expuesto:** Se enciende y apaga con cada pulso de redstone. Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Bombilla de cobre expuesto encerado:** Se enciende y apaga con cada pulso de redstone. La cera evita que se oxide.
- **Bombilla de cobre erosionado:** Se enciende y apaga con cada pulso de redstone. Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Bombilla de cobre erosionado encerado:** Se enciende y apaga con cada pulso de redstone. La cera evita que se oxide.
- **Bombilla de cobre oxidado:** Se enciende y apaga con cada pulso de redstone. Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Bombilla de cobre oxidado encerado:** Se enciende y apaga con cada pulso de redstone. La cera evita que se oxide.
- **Fogata:** Cocina alimentos y su humo sirve de señal.

## Redstone (111)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloque de redstone | `redstone_block` | 5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Puerta de valla de roble | `oak_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Puerta de roble | `oak_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | — |
| Trampilla de roble | `oak_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | — |
| Placa de presión de roble | `oak_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | — |
| Botón de roble | `oak_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | — |
| Puerta de valla de abeto | `spruce_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Puerta de abeto | `spruce_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | — |
| Trampilla de abeto | `spruce_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | — |
| Placa de presión de abeto | `spruce_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | — |
| Botón de abeto | `spruce_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | — |
| Puerta de valla de abedul | `birch_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Puerta de abedul | `birch_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | — |
| Trampilla de abedul | `birch_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | — |
| Placa de presión de abedul | `birch_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | — |
| Botón de abedul | `birch_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | — |
| Puerta de valla de jungla | `jungle_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Puerta de jungla | `jungle_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | — |
| Trampilla de jungla | `jungle_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | — |
| Placa de presión de jungla | `jungle_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | — |
| Botón de jungla | `jungle_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | — |
| Puerta de valla de acacia | `acacia_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Puerta de acacia | `acacia_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | — |
| Trampilla de acacia | `acacia_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | — |
| Placa de presión de acacia | `acacia_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | — |
| Botón de acacia | `acacia_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | — |
| Puerta de valla de roble oscuro | `dark_oak_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | — |
| Puerta de roble oscuro | `dark_oak_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | — |
| Trampilla de roble oscuro | `dark_oak_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | — |
| Placa de presión de roble oscuro | `dark_oak_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | — |
| Botón de roble oscuro | `dark_oak_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | — |
| Puerta de valla de mangle | `mangrove_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | 1.19 |
| Puerta de mangle | `mangrove_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | 1.19 |
| Trampilla de mangle | `mangrove_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | 1.19 |
| Placa de presión de mangle | `mangrove_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | 1.19 |
| Botón de mangle | `mangrove_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | 1.19 |
| Puerta de valla de cerezo | `cherry_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | 1.20 |
| Puerta de cerezo | `cherry_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | 1.20 |
| Trampilla de cerezo | `cherry_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | 1.20 |
| Placa de presión de cerezo | `cherry_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | 1.20 |
| Botón de cerezo | `cherry_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | 1.20 |
| Puerta de valla de roble pálido | `pale_oak_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | 1.21.4 |
| Puerta de roble pálido | `pale_oak_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | 1.21.4 |
| Trampilla de roble pálido | `pale_oak_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | 1.21.4 |
| Placa de presión de roble pálido | `pale_oak_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | 1.21.4 |
| Botón de roble pálido | `pale_oak_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | 1.21.4 |
| Puerta de valla de bambú | `bamboo_fence_gate` | 2 | 3 | Hacha | — | — | Sí | — | Sí | 64 | valla | 1.20 |
| Puerta de bambú | `bamboo_door` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | puerta | 1.20 |
| Trampilla de bambú | `bamboo_trapdoor` | 3 | 3 | Hacha | — | — | Sí | — | Sí | 64 | trampilla | 1.20 |
| Placa de presión de bambú | `bamboo_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | placa | 1.20 |
| Botón de bambú | `bamboo_button` | 0.5 | 0.5 | Hacha | — | — | Sí | — | Sí | 64 | boton | 1.20 |
| Puerta de valla de carmesí | `crimson_fence_gate` | 2 | 3 | Hacha | — | — | — | — | Sí | 64 | valla | 1.16 |
| Puerta de carmesí | `crimson_door` | 3 | 3 | Hacha | — | — | — | — | Sí | 64 | puerta | 1.16 |
| Trampilla de carmesí | `crimson_trapdoor` | 3 | 3 | Hacha | — | — | — | — | Sí | 64 | trampilla | 1.16 |
| Placa de presión de carmesí | `crimson_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | — | — | Sí | 64 | placa | 1.16 |
| Botón de carmesí | `crimson_button` | 0.5 | 0.5 | Hacha | — | — | — | — | Sí | 64 | boton | 1.16 |
| Puerta de valla de distorsionado | `warped_fence_gate` | 2 | 3 | Hacha | — | — | — | — | Sí | 64 | valla | 1.16 |
| Puerta de distorsionado | `warped_door` | 3 | 3 | Hacha | — | — | — | — | Sí | 64 | puerta | 1.16 |
| Trampilla de distorsionado | `warped_trapdoor` | 3 | 3 | Hacha | — | — | — | — | Sí | 64 | trampilla | 1.16 |
| Placa de presión de distorsionado | `warped_pressure_plate` | 0.5 | 0.5 | Hacha | — | — | — | — | Sí | 64 | placa | 1.16 |
| Botón de distorsionado | `warped_button` | 0.5 | 0.5 | Hacha | — | — | — | — | Sí | 64 | boton | 1.16 |
| Puerta de cobre | `copper_door` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | puerta | 1.21 |
| Trampilla de cobre | `copper_trapdoor` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | trampilla | 1.21 |
| Puerta de cobre encerado | `waxed_copper_door` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | puerta | 1.21 |
| Trampilla de cobre encerado | `waxed_copper_trapdoor` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | trampilla | 1.21 |
| Puerta de cobre expuesto | `exposed_copper_door` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | puerta | 1.21 |
| Trampilla de cobre expuesto | `exposed_copper_trapdoor` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | trampilla | 1.21 |
| Puerta de cobre expuesto encerado | `waxed_exposed_copper_door` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | puerta | 1.21 |
| Trampilla de cobre expuesto encerado | `waxed_exposed_copper_trapdoor` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | trampilla | 1.21 |
| Puerta de cobre erosionado | `weathered_copper_door` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | puerta | 1.21 |
| Trampilla de cobre erosionado | `weathered_copper_trapdoor` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | trampilla | 1.21 |
| Puerta de cobre erosionado encerado | `waxed_weathered_copper_door` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | puerta | 1.21 |
| Trampilla de cobre erosionado encerado | `waxed_weathered_copper_trapdoor` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | trampilla | 1.21 |
| Puerta de cobre oxidado | `oxidized_copper_door` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | puerta | 1.21 |
| Trampilla de cobre oxidado | `oxidized_copper_trapdoor` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | trampilla | 1.21 |
| Puerta de cobre oxidado encerado | `waxed_oxidized_copper_door` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | puerta | 1.21 |
| Trampilla de cobre oxidado encerado | `waxed_oxidized_copper_trapdoor` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | trampilla | 1.21 |
| Sensor de sculk | `sculk_sensor` | 1.5 | 1.5 | Azada | — | 1 | — | — | — | 64 | losa | 1.19 |
| Sensor de sculk calibrado | `calibrated_sculk_sensor` | 1.5 | 1.5 | Azada | — | 1 | — | — | — | 64 | losa | 1.20 |
| Antorcha de redstone | `redstone_torch` | 0 | 1 | — | — | 7 | — | — | Sí | 64 | cruz | — |
| Lámpara de redstone | `redstone_lamp` | 0.3 | 0.3 | — | — | 15 | — | — | — | 64 | cubo | — |
| Polvo de redstone | `redstone_wire` | 0 | 1 | — | — | — | — | — | Sí | 64 | alfombra | — |
| Repetidor de redstone | `repeater` | 0 | 1 | — | — | — | — | — | Sí | 64 | placa | — |
| Comparador de redstone | `comparator` | 0 | 1 | — | — | — | — | — | Sí | 64 | placa | — |
| Pistón | `piston` | 1.5 | 1.5 | Pico | — | — | — | — | — | 64 | cubo | — |
| Pistón pegajoso | `sticky_piston` | 1.5 | 1.5 | Pico | — | — | — | — | — | 64 | cubo | — |
| Observador | `observer` | 3 | 3 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Dispensador | `dispenser` | 3.5 | 3.5 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Soltador | `dropper` | 3.5 | 3.5 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Tolva | `hopper` | 3 | 4.8 | Pico | madera | — | — | — | Sí | 64 | tolva | — |
| Palanca | `lever` | 0.5 | 0.5 | — | — | — | — | — | Sí | 64 | cruz | — |
| Botón de piedra | `stone_button` | 0.5 | 0.5 | Pico | — | — | — | — | Sí | 64 | boton | — |
| Placa de presión de piedra | `stone_pressure_plate` | 0.5 | 0.5 | Pico | madera | — | — | — | Sí | 64 | placa | — |
| Placa de presión ligera | `light_weighted_pressure_plate` | 0.5 | 0.5 | Pico | madera | — | — | — | Sí | 64 | placa | — |
| Placa de presión pesada | `heavy_weighted_pressure_plate` | 0.5 | 0.5 | Pico | madera | — | — | — | Sí | 64 | placa | — |
| Gancho de cuerda | `tripwire_hook` | 0 | 1 | — | — | — | — | — | Sí | 64 | cruz | — |
| Sensor de luz solar | `daylight_detector` | 0.2 | 0.2 | Hacha | — | — | Sí | — | Sí | 64 | losa | — |
| Diana | `target` | 0.5 | 0.5 | Azada | — | — | — | — | — | 64 | cubo | 1.16 |
| Bloque musical | `note_block` | 0.8 | 0.8 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Dinamita | `tnt` | 0 | 0 | — | — | — | Sí | — | — | 64 | cubo | — |
| Bloque de slime | `slime_block` | 0 | 0 | — | — | — | — | — | Sí | 64 | cristal | — |
| Bloque de miel | `honey_block` | 0 | 0 | — | — | — | — | — | Sí | 64 | cristal | 1.15 |
| Raíl | `rail` | 0.7 | 0.7 | Pico | — | — | — | — | Sí | 64 | alfombra | — |
| Raíl propulsor | `powered_rail` | 0.7 | 0.7 | Pico | — | — | — | — | Sí | 64 | alfombra | — |
| Raíl detector | `detector_rail` | 0.7 | 0.7 | Pico | — | — | — | — | Sí | 64 | alfombra | — |
| Raíl activador | `activator_rail` | 0.7 | 0.7 | Pico | — | — | — | — | Sí | 64 | alfombra | — |
| Fabricador | `crafter` | 1.5 | 3.5 | Pico | — | — | — | — | — | 64 | cubo | 1.21 |
| Puerta de hierro | `iron_door` | 5 | 5 | Pico | — | — | — | — | Sí | 64 | puerta | — |
| Trampilla de hierro | `iron_trapdoor` | 5 | 5 | Pico | — | — | — | — | Sí | 64 | trampilla | — |
| Pararrayos | `lightning_rod` | 3 | 6 | Pico | piedra | — | — | — | Sí | 64 | cruz | 1.17 |
| Cofre trampa | `trapped_chest` | 2.5 | 2.5 | Hacha | — | — | — | — | Sí | 64 | cofre | — |

- **Bloque de redstone:** Fuente de energía de redstone permanente.
- **Puerta de cobre:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Trampilla de cobre:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Puerta de cobre encerado:** La cera evita que se oxide.
- **Trampilla de cobre encerado:** La cera evita que se oxide.
- **Puerta de cobre expuesto:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Trampilla de cobre expuesto:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Puerta de cobre expuesto encerado:** La cera evita que se oxide.
- **Trampilla de cobre expuesto encerado:** La cera evita que se oxide.
- **Puerta de cobre erosionado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Trampilla de cobre erosionado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Puerta de cobre erosionado encerado:** La cera evita que se oxide.
- **Trampilla de cobre erosionado encerado:** La cera evita que se oxide.
- **Puerta de cobre oxidado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Trampilla de cobre oxidado:** Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.
- **Puerta de cobre oxidado encerado:** La cera evita que se oxide.
- **Trampilla de cobre oxidado encerado:** La cera evita que se oxide.
- **Sensor de sculk:** Detecta vibraciones a 8 bloques y emite señal de redstone.
- **Lámpara de redstone:** Da luz 15 solo cuando recibe señal de redstone.
- **Polvo de redstone:** Lleva la señal hasta 15 bloques.
- **Pistón:** Empuja hasta 12 bloques.
- **Pistón pegajoso:** También jala el bloque de vuelta.
- **Observador:** Manda un pulso cuando cambia el bloque que mira.
- **Tolva:** Pasa objetos de un contenedor a otro.
- **Bloque musical:** Toca una nota; el instrumento depende del bloque de abajo.
- **Dinamita:** Explota 4 segundos después de encenderla.
- **Bloque de slime:** Rebota y no hace daño al caer. Arrastra bloques al empujarlo con un pistón.
- **Bloque de miel:** Pegajoso: frena y deja escalar sus lados.
- **Fabricador:** Fabrica automáticamente con un pulso de redstone.
- **Puerta de hierro:** Solo se abre con redstone.

## Utilidad (64)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cama blanca | `white_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker blanca | `white_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama naranja | `orange_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker naranja | `orange_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama magenta | `magenta_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker magenta | `magenta_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama azul claro | `light_blue_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker azul claro | `light_blue_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama amarilla | `yellow_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker amarilla | `yellow_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama verde lima | `lime_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker verde lima | `lime_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama rosa | `pink_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker rosa | `pink_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama gris | `gray_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker gris | `gray_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama gris claro | `light_gray_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker gris claro | `light_gray_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama cian | `cyan_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker cian | `cyan_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama morada | `purple_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker morada | `purple_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama azul | `blue_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker azul | `blue_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama marrón | `brown_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker marrón | `brown_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama verde | `green_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker verde | `green_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama roja | `red_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker roja | `red_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Cama negra | `black_bed` | 0.2 | 0.2 | — | — | — | Sí | — | Sí | 1 | cama | — |
| Caja de shulker negra | `black_shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Caja de shulker | `shulker_box` | 2 | 2 | Pico | — | — | — | — | — | 1 | cubo | — |
| Nexo de reaparición | `respawn_anchor` | 50 | 1200 | Pico | diamante | 15 | — | — | — | 64 | cubo | 1.16 |
| Magnetita | `lodestone` | 3.5 | 3.5 | Pico | madera | — | — | — | — | 64 | cubo | 1.16 |
| Cofre de ender | `ender_chest` | 22.5 | 600 | Pico | madera | 7 | — | — | — | 64 | cubo | — |
| Faro | `beacon` | 3 | 3 | — | — | 15 | — | — | Sí | 64 | cristal | — |
| Mesa de crafteo | `crafting_table` | 2.5 | 2.5 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Horno | `furnace` | 3.5 | 3.5 | Pico | madera | — | — | — | — | 64 | cubo | — |
| Alto horno | `blast_furnace` | 3.5 | 3.5 | Pico | madera | — | — | — | — | 64 | cubo | 1.14 |
| Ahumador | `smoker` | 3.5 | 3.5 | Pico | madera | — | — | — | — | 64 | cubo | 1.14 |
| Cofre | `chest` | 2.5 | 2.5 | Hacha | — | — | Sí | — | Sí | 64 | cofre | — |
| Barril | `barrel` | 2.5 | 2.5 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.14 |
| Mesa de encantamientos | `enchanting_table` | 5 | 1200 | Pico | madera | 7 | — | — | Sí | 64 | losa | — |
| Yunque | `anvil` | 5 | 1200 | Pico | madera | — | — | Sí | Sí | 64 | yunque | — |
| Afiladora | `grindstone` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | 1.14 |
| Cortapiedras | `stonecutter` | 3.5 | 3.5 | Pico | madera | — | — | — | Sí | 64 | losa | 1.14 |
| Telar | `loom` | 2.5 | 2.5 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.14 |
| Mesa de cartografía | `cartography_table` | 2.5 | 2.5 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.14 |
| Mesa de flechas | `fletching_table` | 2.5 | 2.5 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.14 |
| Mesa de herrería | `smithing_table` | 2.5 | 2.5 | Hacha | — | — | — | — | — | 64 | cubo | 1.14 |
| Compostador | `composter` | 0.6 | 0.6 | Hacha | — | — | Sí | — | Sí | 64 | tolva | 1.14 |
| Caldero | `cauldron` | 2 | 2 | Pico | madera | — | — | — | Sí | 64 | tolva | — |
| Soporte para pociones | `brewing_stand` | 0.5 | 0.5 | Pico | madera | 1 | — | — | Sí | 64 | cruz | — |
| Tocadiscos | `jukebox` | 2 | 6 | Hacha | — | — | Sí | — | — | 64 | cubo | — |
| Atril | `lectern` | 2.5 | 2.5 | Hacha | — | — | Sí | — | Sí | 64 | losa | 1.14 |
| Campana | `bell` | 5 | 5 | Pico | — | — | — | — | Sí | 64 | farol | 1.14 |
| Andamio | `scaffolding` | 0 | 0 | — | — | — | Sí | — | Sí | 64 | hojas | 1.14 |
| Escalera de mano | `ladder` | 0.4 | 0.4 | Hacha | — | — | — | — | Sí | 64 | panel | — |
| Maceta | `flower_pot` | 0 | 0 | — | — | — | — | — | Sí | 64 | farol | — |
| Vasija decorada | `decorated_pot` | 0 | 0 | — | — | — | — | — | Sí | 64 | farol | 1.20 |
| Colmena | `beehive` | 0.6 | 0.6 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.15 |
| Nido de abejas | `bee_nest` | 0.3 | 0.3 | Hacha | — | — | Sí | — | — | 64 | cubo | 1.15 |
| Bloque de hueso | `bone_block` | 2 | 2 | Pico | madera | — | — | — | — | 64 | cubo | — |

- **Cama blanca:** En el Nether y el End explota.
- **Caja de shulker blanca:** Guarda sus objetos al romperla.
- **Cama naranja:** En el Nether y el End explota.
- **Caja de shulker naranja:** Guarda sus objetos al romperla.
- **Cama magenta:** En el Nether y el End explota.
- **Caja de shulker magenta:** Guarda sus objetos al romperla.
- **Cama azul claro:** En el Nether y el End explota.
- **Caja de shulker azul claro:** Guarda sus objetos al romperla.
- **Cama amarilla:** En el Nether y el End explota.
- **Caja de shulker amarilla:** Guarda sus objetos al romperla.
- **Cama verde lima:** En el Nether y el End explota.
- **Caja de shulker verde lima:** Guarda sus objetos al romperla.
- **Cama rosa:** En el Nether y el End explota.
- **Caja de shulker rosa:** Guarda sus objetos al romperla.
- **Cama gris:** En el Nether y el End explota.
- **Caja de shulker gris:** Guarda sus objetos al romperla.
- **Cama gris claro:** En el Nether y el End explota.
- **Caja de shulker gris claro:** Guarda sus objetos al romperla.
- **Cama cian:** En el Nether y el End explota.
- **Caja de shulker cian:** Guarda sus objetos al romperla.
- **Cama morada:** En el Nether y el End explota.
- **Caja de shulker morada:** Guarda sus objetos al romperla.
- **Cama azul:** En el Nether y el End explota.
- **Caja de shulker azul:** Guarda sus objetos al romperla.
- **Cama marrón:** En el Nether y el End explota.
- **Caja de shulker marrón:** Guarda sus objetos al romperla.
- **Cama verde:** En el Nether y el End explota.
- **Caja de shulker verde:** Guarda sus objetos al romperla.
- **Cama roja:** En el Nether y el End explota.
- **Caja de shulker roja:** Guarda sus objetos al romperla.
- **Cama negra:** En el Nether y el End explota.
- **Caja de shulker negra:** Guarda sus objetos al romperla.
- **Nexo de reaparición:** Fija tu reaparición en el Nether. Cargado con piedra luminosa da luz 3–15. En el mundo normal explota.
- **Magnetita:** Hace que una brújula apunte hacia ella.
- **Cofre de ender:** Comparte el mismo inventario en cualquier lugar del mundo.
- **Faro:** Sobre una pirámide de minerales da efectos de estado y un rayo de luz al cielo.
- **Mesa de crafteo:** Cuadrícula de 3×3 para fabricar.
- **Alto horno:** Funde minerales al doble de velocidad.
- **Ahumador:** Cocina comida al doble de velocidad.
- **Cofre:** 27 espacios; dos juntos forman un cofre doble.
- **Yunque:** Repara y renombra. Se va dañando con el uso.
- **Mesa de herrería:** Mejora el equipo de diamante a netherita.
- **Andamio:** Se sube y baja por dentro; se rompe todo de un golpe desde abajo.
- **Vasija decorada:** Se arma con fragmentos de cerámica arqueológica.

## Especiales (23)

| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lecho de roca | `bedrock` | ∞ | 3.6 M | — | — | — | — | — | — | 64 | cubo | — |
| Pizarra profunda reforzada | `reinforced_deepslate` | 55 | 1200 | — | — | — | — | — | — | 64 | cubo | 1.19 |
| Agua | `water` | 100 | 100 | — | — | — | — | — | Sí | 64 | liquido | — |
| Lava | `lava` | 100 | 100 | — | — | 15 | — | — | Sí | 64 | liquido | — |
| Sculk | `sculk` | 0.2 | 0.2 | Azada | — | — | — | — | — | 64 | cubo | 1.19 |
| Catalizador de sculk | `sculk_catalyst` | 3 | 3 | Azada | — | 6 | — | — | — | 64 | cubo | 1.19 |
| Chillador de sculk | `sculk_shrieker` | 3 | 3 | Azada | — | — | — | — | — | 64 | losa | 1.19 |
| Corazón de crujidor | `creaking_heart` | 10 | 10 | Hacha | — | — | — | — | — | 64 | cubo | 1.21.4 |
| Luz | `light` | ∞ | 3.6 M | — | — | 15 | — | — | Sí | 64 | nada | — |
| Generador de criaturas | `spawner` | 5 | 5 | Pico | madera | — | — | — | Sí | 64 | cristal | — |
| Generador de desafíos | `trial_spawner` | 50 | 50 | Pico | — | — | — | — | Sí | 64 | cristal | 1.21 |
| Bóveda | `vault` | 50 | 50 | Pico | — | 6 | — | — | Sí | 64 | cristal | 1.21 |
| Núcleo pesado | `heavy_core` | 10 | 1200 | Pico | — | — | — | — | Sí | 64 | farol | 1.21 |
| Bloque de comandos | `command_block` | ∞ | 3.6 M | — | — | — | — | — | — | 64 | cubo | — |
| Bloque de comandos en cadena | `chain_command_block` | ∞ | 3.6 M | — | — | — | — | — | — | 64 | cubo | — |
| Bloque de comandos de repetición | `repeating_command_block` | ∞ | 3.6 M | — | — | — | — | — | — | 64 | cubo | — |
| Bloque de estructuras | `structure_block` | ∞ | 3.6 M | — | — | — | — | — | — | 64 | cubo | — |
| Bloque rompecabezas | `jigsaw` | ∞ | 3.6 M | — | — | — | — | — | — | 64 | cubo | — |
| Barrera | `barrier` | ∞ | 3.6 M | — | — | — | — | — | Sí | 64 | cristal | — |
| Caliza de Giza | `giza_limestone` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | Mapa de Giza |
| Caliza de Giza gastada | `giza_limestone_dark` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | Mapa de Giza |
| Revestimiento de Tura | `giza_casing` | 2 | 6 | Pico | madera | — | — | — | — | 64 | cubo | Mapa de Giza |
| Granito de Asuán | `giza_granite` | 1.5 | 6 | Pico | madera | — | — | — | — | 64 | cubo | Mapa de Giza |

- **Lecho de roca:** Indestructible en supervivencia. Forma el fondo del mundo.
- **Pizarra profunda reforzada:** Solo aparece en las ciudades antiguas. No se puede obtener.
- **Agua:** Fluye hasta 7 bloques en horizontal. Una fuente infinita se forma con dos fuentes.
- **Lava:** Prende fuego a lo inflamable. En el Nether fluye más rápido y más lejos.
- **Sculk:** Se extiende cuando muere algo cerca de un catalizador.
- **Chillador de sculk:** En las ciudades antiguas, si chilla tres veces invoca al Warden.
- **Luz:** Bloque invisible solo para comandos y creativo; da la luz que elijas (0–15).
- **Generador de criaturas:** Aparece en mazmorras; genera criaturas si estás cerca.
- **Bóveda:** Se abre con una llave de desafío y da un botín por jugador.
- **Núcleo pesado:** Con una vara de brisa se fabrica la maza.
- **Bloque de comandos:** Ejecuta comandos con redstone. Solo en creativo con trucos.
- **Bloque de estructuras:** Guarda y carga estructuras.
- **Barrera:** Bloque invisible e indestructible para delimitar zonas.
- **Caliza de Giza:** Piedra de los bloques del núcleo de las pirámides. No existe en Minecraft: es de este mapa.
- **Caliza de Giza gastada:** Caliza erosionada por 4,500 años de viento y arena.
- **Revestimiento de Tura:** Caliza blanca y pulida de Tura que cubría las pirámides. En Kefrén aún queda en la cima.
- **Granito de Asuán:** Granito rosa traído de Asuán, a 900 km. Forra la Cámara del Rey y la base de Micerinos.

