# Death Race

https://youtu.be/lCSRrM5xp5s


![Cabecera Tron](https://vignette.wikia.nocookie.net/tron/images/c/c7/Light_Cycle_Race_in_--Tron_%28film%29-Tron--.jpg/revision/latest?cb=20110116153052)
<br><sub>Imagen obtenida de Tron Wiki (https://tron.fandom.com/wiki/Tron_Wiki)</sub>

#### Videojuego para la asignatura de Juegos en Red
#### Grado en diseño y desarrollo de videojuegos - URJC

Adaptación de la carrera de motos de luz de la película Tron.

Equipo de desarrollo:
* Pablo Fernández-Vega Padilla
* David María Arribas
* Dilan Steven Rodríguez Triana
* Alejandro Vera López

# Demo jugable del último master
https://death-race.dmariaa.es

# Documento de diseño del videojuego

## Análisis del videojuego

### Resumen del juego

Death Race es un juego arcade multijugador basado en la carrera de motos de luz (light cycles) que aparece en la película Tron en su edición clásica de 1982. Tomando como referencia este clásico del cine de videojuegos, el jugador conducirá una moto por una **arena** donde dejará a su paso una estela que funcionará como barrera para el resto de competidores, aunque está no será la única opción que se le presentará para poder alcanzar la victoria. En nuestra revisión hemos decidido añadir escenarios algo mas complejos, además de trampas y power-ups que permitirán al jugador aplicar ciertas estrategias a la hora de vencer a sus oponentes, mejorando la experiencia de juego. 

En Death Race hasta 4 jugadores se enfrentarán entre ellos a lo largo de varias rondas con el fin de ganar la copa del campeón. Se trata de un juego arcade competitivo online que estará disponible en ordenador. Circulamos a través del mapa de manera que dejamos estelas contra las que otros jugadores pueden chocar y morir.

### Género

El videojuego se podría clasificar dentro de los siguientes géneros:
* **Arcade** es el principal género en que encaja el videojuego. Aspectos como su acción rápida, el ranking de jugadores junto con la puntuación más alta lo encajan principalmente dentro de esta categoría.
* Por sus características de lucha a "muerte" entre los distintos jugadores presenta rasgos de **Beat'em up**.
* Los powerups y trampas también dotan a este videojuego de un cierto carácter **Estratégico**, aunque es posible jugar el videojuego sin necesidad de estrategia alguna.

### Plataformas

En principio, debido a los esquemas de control y otros aspectos del videojuego para la única plataforma para la que estaría sería ordenador, ejecutándose este en un navegador Web.

### Audiencia objetivo

Este juego es de corte clásico, por lo que uno de sus sectores principales de juego son los jugadores veteranos, aquellos que se criaron con videojuegos de los 80 y 90 y las máquinas arcade. A su vez, su componente puramente online, lo hace un juego bastante apto para la gran franja de jugadores: las personas entre 16 y 24 años. Todos los jugadores que disfruten de los arcades más clásicos disfrutarán de este juego.

### Historia y personajes

En el planeta de Vumex, existía un problema de superpoblación en los barrios bajos. La gente vivía en la pobreza y dentro de los suburbios había muchos robos y delincuencia. Para acabar con este problema y poder hacer ingreso con los necesitados, la élite de Vumex ideó un deporte extremo en el que se matarían entre ellos. Este juego se nombró Death Race.

El juego consistía en elegir entre 2 y 4 pilotos, en función del precio de la entrada (a más pilotos, más cara); y que compitan en un circuito cerrado dejando estelas de luz por donde han circulado. Los participantes visten un traje especial que les vuelve fotosensibles, por lo que al pasar por una de las estelas de luz, el piloto muere en el juego.

Cuando sólo queda un piloto, éste es declarado como el ganador de la ronda. Lo que esto supone es que sigue estando en las siguientes rondas hasta que fallece. Desde que se empezó la primera ronda, Death Race no se ha cerrado, está en un continuo entrar y salir de conductores.

El juego se volvió tan popular que comenzaron a venir desde otros planetas para ver esta competición a muerte. La superpoblación consiguió controlarse y ahora se recompensa a la familia de cada piloto que participa con dinero en función de cuántas rondas dure.

El jugador representa uno de estos pilotos que han encontrado en el juego su medio de vida. 

## Jugabilidad, Gameplay

### Resumen de jugabilidad

El jugador controlará un **vehículo** que se desplaza por la arena en linea recta. Puede realizar giros de 90º a derecha e izquierda. A lo largo de su recorrido se va desplegando una estela/un muro. El corredor debe evitar chocar contra otro corredor, los muros naturales del escenario o los desplegados por los propios vehículos ya que esto supondrá un accidente que terminará su participación en la arena.

En la arena encontrará trampas y ayudas por los que debe luchar con el resto de jugadores.

En el juego participan un mínimo de 2 jugadores y un máximo de 4.

### Directrices de jugabilidad

* El juego debe transmitir sensación de velocidad, de ahí limitar la velocidad mínima.
* Al ser partidas rápidas, el jugador que pierde no se aburrirá viendo cómo juegan los demás.
* El tiempo de espera en los halls de las partidas debería minimizarse, también las transiciones entre las arenas.
* Los power-ups deben representar una ventaja, pero tener limitado su tiempo de uso para no ser completamente determinantes.
* Debe haber un límite en el número de power-ups que el usuario puede llevar.

### Mecánicas

#### Resumen de las mecánicas

Modo de juego:

* El juego se jugará en partidas de 2 a 4 jugadores (exploraremos la opción de soportar mas, hasta 8 por ejemplo), *todos contra todos*. 

Partidas:

* El servidor permitirá a cualquier usuario crear una nueva partida.
* En cada partida se jugará un número *infinito* de rondas, mientras el número de jugadores mínimo siga activo en la partida.
* Las partidas disponibles, las que se están jugando y las terminadas se listarán en el videojuego.
* Un usuario podrá solicitar unirse a una partida que no haya comenzado aún, y/o que no se encuentre completa. Cuando un jugador entre en una partida activa que no está completa deberá esperar a que termine la ronda actual para jugar.
* Cuando se complete el número mínimo (a elegir por el creador de la partida entre 2 y 4 jugadores) de jugadores activos en una partida, esta dará comienzo automáticamente.

Mecánicas de juego:

* Cada jugador conduce un *vehículo* por la **arena** del videojuego. 
* El vehículo se mueve en linea recta, los giros son de 90 grados siempre, es decir el vehículo se mueve en dirección norte o sur o este u oeste. 
* El jugador controla la dirección del vehículo, su velocidad (se puede frenar la moto, hasta una velocidad mínima establecida, no se puede detener) y la ejecución de los power-ups.
* El vehículo va trazando una estela por donde va pasando, esta estela es un *muro* para todos los vehículos (incluido el mismo que genera la estela).
* Además de las estelas, en la **arena** puede haber **muros** naturales (incluidos los límites de la arena).
* El vehículo que choca contra una estela o un muro, explota, y su jugador muere en esta arena, debiendo esperar a que termine esta arena para poder seguir jugando.
* La longitud de la estela determina la puntuación del jugador. El último jugador vivo, ganador de la ronda, recibe una cantidad de puntos extra.
* En la arena hay trampas y power-ups ocultos. Cada *cierto tiempo (por definir)* se muestran durante *unos segundos (por definir)* las trampas y los power-ups tras los cuales estos se vuelven a ocultar. El vehículo puede recoger un power-up o caer en una trampa esté visible o no.
* El vehículo que recoge un power-up puede usarlo en esta arena o en las siguientes, mientras el power-up *siga vivo (definir una duración máxima, o un numero de balas máximo, ... en función del power-up)*.
* Cada vehículo dispone de 3 slots para almacenar power-ups, no puede recoger y llevar mas de 3 al mismo tiempo.
* El vehículo que cae en una trampa explota, y su jugador muere en esta arena, debiendo esperar a que termine esta arena para poder seguir jugando.
* La puntuación se va acumulando a lo largo de las distintas **arenas** jugadas en una **partida**.

#### Objetivos y recompensas

El videojuego, al pertenecer al género arcade, motivará al jugador dándole una puntuación (que se calculará en base a determinados elementos como explicamos en el apartado "Puntuación"). Esto incitará a que el mismo usuario se quiera superar a sí mismo jugando una y otra vez. A su vez, a ser un juego online, el factor competitivo será otro de los factores que anima a los jugadores a, no sólo jugar para mejorar contra sí mismos, sino para vencer a sus rivales.

| Objetivos | Recompensas | Niveles de dificultad |
| :-------- | :---------- | :-------------------- |
| Vencer durante las diferentes rondas y quedar como ganador de la partida | La recompensa de seguir jugando a lo largo de la partida y no abandonar será obtener una puntuación mayor, ya que a más rondas, más puntos; para poder ser reconocido como ganador de la partida. | El nivel de dificultad dependerá de la habilidad del propio jugador y de la habilidad de los usuarios contra los que se enfrente. Se intentará poner un terreno neutro en el que el equilibrio de la partida sea roto por los propios jugadores. |

#### Sistema de puntuación

| Elemento de puntuación | Descripción | Puntos dados |
| :--------------------- | :---------- | :------------|
| Estela | El usuario va sumando puntos según su estela se va haciendo más larga | 10 puntos por cada metro recorrido |
| Muerte | Se tiene en cuenta el número de bajas del usuario y será uno de los factores a tener en cuenta para ganar la partida. | 250 puntos por cada baja |
| Ganador de la arena | El último que sobreviva a cada ronda se le declarará ganador de la arena | 500 puntos a cada ganador de la arena |

La puntuación estará formada por tres elementos: la estela, las bajas y el ganador de cada ronda. Trazar una estela mayor dará más puntos al usuario. El usuario ganará diez puntos por cada metro cubierto de estela. A lo largo de las diferentes arenas se contabilizará las muertes causadas por un jugador, ya sea por su estela o por el efecto de un powerup. Finalmente el jugador que sobreviva a cada ronda será declarado como el "ganador de la arena" y se llevará una recompensa por su victoria.

De la manera establecida, por cada metro cubierto de estela, el jugador obtendrá 10 puntos; por cada asesinato obtendrá 250 puntos y por ser ganador de la arena se obtendrá 500 puntos. La suma de todos estos valores al final de todas las rondas hará lo llamado como puntuación y quien tenga una mayor puntuación será el ganador de la partida.

*Nota*: todos estos valores son relativos y se cambiarán (si fuera necesario) en función de la longitud de los escenarios, la dificultad (o facilidad) para derrotar y diferentes valores para dar una jugabilidad más justa y equilibrada.

#### Power-ups
Death Race contará con varios Power-ups que harán más disfrutable y entretenidas las partidas. Estos Power-ups estarán distribuidos por el mapa de manera que cualquiera de los usuarios podrá cogerlos. Los Power-ups se podrán recoger y utilizar cuando el jugador crea oportuno, no siendo obligatorio ni automático su uso tras tocarlos.

Los Power-ups, como ya se ha dicho, no serán aleatorios, aunque sí su localización en el mapa. A su vez, se cambiarán de objetos cada que se acabe una ronda.

| Nombre | Descripción| Efecto |
| :----- | :--------- | :----- |
| Spark Drink | Bebida energética de color amarillo de uno de los patrocinadores: Sparky S.A. | Aumenta en x1,5 la velocidad del usuario durante 3 segundos |
| Gummy Bomb | Pequeña bomba que no se puede lanzar por su componente pegajoso | Afecta a los usuarios que estén a una casilla de distancia de quien la activa |
| Mirror Shield | Armadura naranja con varios espejos que reflejan cualquier efecto enemigo | Devuelve el efecto de otro Power-up al usuario que lo lanzó |
| Strings' Puppet | Cuerdas de una marioneta vieja, pero que se conservan en perfecto estado | Cambias de dirección a un enemigo 90º a la izquierda o a la derecha, en función de lo que quiera el usuario.|
| Sharp Knife | Cuchillo afilado. Un arma bastante común en los barrios bajos de Vumex | Se lanza un cuchillo en línea recta que mata a un enemigo si lo impacta |
| Poison of Wisdom | Pócima venenosa de color verde que se da a presos cuando se quiere que confiesen | Desvela todas las trampas del mapa a cambio de quitar 500 puntos |
| Laser shot | Arma blanca y azul usada por los mejores guerreros de Vumex. Dispara un láser rojo que disuelve al enemigo al instante | Tiene 3 disparos que avanzan en línea recta. Una vez usados los tres, el usuario muere |
| Commanded Missile | Gran misil tele-dirigido que persigue se lanza sobre un punto | Misil que sólo se puede usar si se va último en la partida y se han completado más de 3 rondas. Se eligen un punto en el mapa y explota todo lo que haya en ese y los 8 puntos que le rodean, ya sean trampas, estelas, muros o enemigos. |
| Ghost Coat | Capa encantada que usaban los ladrones de guante blanco para atracar bancos o joyerías | Al ponerte la capa, puedes atravesar muros y estelas durante los 5 segundos que duran. Tampoco se activan las trampas por las que pases |
| Drill Horn | Cuerno metálico que se puede colocar en el casco de la equipación | Permite atravesar, rompiendo, hasta tres bloques de muro. |
| Friendship present | Caja de regalo que se da a alguien cuando se quiere reforzar la amistad | Se elije un punto aleatorio del mapa y sale un Power-Up (distinto a este) aleatorio también. |
| Time Wizard | Pequeño reloj rojo que puede controlar el tiempo | Reduces a x0.5 la velocidad de uno de los jugadores. Este se elige de forma aleatoria. |

#### Diseño de los niveles

El juego dispondrá de 5 arenas (en versión definitiva se podrían generar mas) que aparecerán de forma aleatoria. Para que el jugador no sepa en ningún momento dónde se encuentran los Powerups o las trampas, se optará por que estas aparezcan de forma aleatoria por el mapa. 

| Nivel | Descripción |
| :---- | :---------- |
| Arena 1 | ![death-race-nivel1](https://user-images.githubusercontent.com/5584976/66428846-1b057280-ea17-11e9-8c76-7d521c7b7996.png) |
| Arena 2 | ![death-race-nivel2](https://user-images.githubusercontent.com/5584976/66428887-33758d00-ea17-11e9-8119-ea59b63ac33a.png) |
| Arena 3 | ![Nivel_3 1](https://user-images.githubusercontent.com/5584976/66435047-3c209000-ea24-11e9-9474-9bc91dfda15d.png) |
| Arena 4 | ![Nivel_4 1](https://user-images.githubusercontent.com/5584976/66435092-5195ba00-ea24-11e9-8fe4-bb0f0bd68197.png) |
| Arena 5 | ![Nivel_5 1](https://user-images.githubusercontent.com/5584976/66435098-55294100-ea24-11e9-8431-ffadd8c9732f.png) |

#### Esquema de control

Para Death Race, hemos elegido una distribución de teclado clásica. Al soportar dos jugadores en el mismo teclado, usamos las teclas QWEASD para controlar la moto 1 y sus power-ups, para el segundo jugador usaremos las teclas de cursor y las teclas ",", "." y "-" para las mismas acciones.

Existirá la posibilidad de jugar usando un mando de control.

Para el jugador 1:

| Botón | Acción |
| :---- | :----- |
| S | Freno. Desacelera hasta la velocidad mínima, que se mantiene mientras la tecla siga pulsada. |
| D | Al pulsar esta Tecla, la moto girará 90º hacia la derecha.|
| A | Al pulsar esta Tecla, la moto girará 90º hacia la izquierda.|
| Q | Al pulsar esta Tecla, se lanza el power-up almacenado en el primer slot. |
| W | Al pulsar esta Tecla, se lanza el power-up almacenado en el segundo slot. |
| E | Al pulsar esta Tecla, se lanza el power-up almacenado en el tercer slot. |

Para el jugador 2:

| Botón | Acción |
| :---- | :----- |
| ↓ | Freno. Desacelera hasta la velocidad mínima, que se mantiene mientras la tecla siga pulsada. |
| ← | Al pulsar esta Tecla, la moto del segundo jugador girará 90º hacia la izquierda.|
| → | Al pulsar esta Tecla, la moto del segundo jugador girará 90º hacia la derecha.|
| , | Al pulsar esta Tecla, se cambiará la selección del Powerup del segundo jugador hacia la izquierda.|
| . | Al pulsar esta Tecla, se cambiará la selección del Powerup del segundo jugador hacia la derecha.|
| - | Al pulsar esta Tecla, se usará el Powerup seleccionado por el segundo jugador.|

## Estética e interfaz de usuario

La estética general del videojuego será la de un arcade clásico, con gráficos PixelArt.

### Experiencia de usuario

El juego presentaría al usuario:

* Un "hall" del juego desde el cual podrá ver las partidas disponibles o crear una partida nueva. También podrá acceder a las estadísticas del videojuego y a las opciones de configuración. También podrá personalizar sus características *(en este momento su alias nada más)*

* Al crear una nueva partida o unirse a una, el jugador accederá al "hall" de la partida. En está pantalla realizará la espera mientras se unen el resto de jugadores, podrá ver los jugadores que ya se han unido, elegir su "color" para esta partida. *(Ver la posibilidad de incluir un chat)*

* Cuando se hayan conectado todos los jugadores, el juego dará paso a la "arena" de juego. En primer lugar mostrará la arena con la posición de partida de todos los jugadores, la situación de las trampas y power-ups. Una cuenta atrás dará la salida. En el momento del arranque, cuando el contador llegue a cero, las trampas y power-ups se ocultarán, aunque permanecerán activos en la arena. Los **vehículos** se pondrán en marcha. El jugador podrá controlar la dirección de la moto (giros de 90º, siempre en linea recta) y la velocidad (con una velocidad mínima y una máxima, no se debe perder la sensación de "velocidad"). Cada cierto tiempo, las trampas y power-ups se volverán visibles por unos segundos para recordar a los usuarios donde están, aunque permanecerán activos estén visibles u ocultos. Al colisionar con un muro, ya sean los naturales de la arena o los generados por los **vehículos** (incluido el propio) o con una trampa, el **vehículo** se estrellará y finalizará su participación en la arena, el jugador quedará como un observador pasivo de la acción.

* Cuando todos los jugadores hayan muerto, volverán al hall de la partida donde verán las puntuaciones obtenidas y, si no deciden salirse, entrarán en la siguiente arena, repitiendo la mecánica del punto anterior. Si el jugador decide salir de la partida, volverá al hall del videojuego dónde podrá unirse a otra partida.


#### Pantalla de Inicio

Pantalla de inicio del videojuego, presenta el menú principal con las opciones para entrar a la lista de partidas, ver las puntuaciones, configurar el videojuego y salir de este.

![Inicio](https://user-images.githubusercontent.com/5584976/66351528-00bb8e00-e95e-11e9-976a-725874719d05.png)

#### Lista de partidas

Desde esta pantalla se verán las partidas en juego. El jugador tendrá la opción de unirse a las partidas que estén disponibles, y la de crear una partida nueva.

![Lista de partidas](https://user-images.githubusercontent.com/5584976/66340625-dbbb2100-e945-11e9-8c89-a54833de116e.png)

#### Nueva partida

En esta pantalla se configurará el nombre y número mínimo de jugadores al crear una nueva partida.

![Nueva partida](https://user-images.githubusercontent.com/5584976/66351400-c3ef9700-e95d-11e9-93a1-8e4e7313e15c.png)

#### Hall de partida

Esta es la pantalla de espera mientras los jugadores necesarios se unen a nuestra partida. En ella se verán ekl nombre de la partida y el número de jugadores mínimo, los jugadores actuales y el color elegido por cada uno.

![Hall partida](https://user-images.githubusercontent.com/5584976/66340622-db228a80-e945-11e9-93bf-9f3bae6c76fd.png)

#### Juego

Esta es la pantalla del juego. Además de las motos y demás elementos del juego, el jugador podrá ver su puntuación actual y los powerups que ha recogido con las teclas de acceso a estos.

![Juego - Arena](https://user-images.githubusercontent.com/5584976/66340623-dbbb2100-e945-11e9-93eb-f7303094bdbb.png)

### Vehículos, trampas, power-ups

#### Vehículos

![Jer_vehicles_design](https://user-images.githubusercontent.com/5584976/66419353-492d8700-ea04-11e9-9554-c5376e730a2a.png)

#### Power-Ups

![Power_ups_beta_1](https://user-images.githubusercontent.com/5584976/66428634-bfd38000-ea16-11e9-9bd7-24e711b9b85d.png)




# Fase 2

## Cambios realizados

Al finalizar el primero, teníamos un prototipo que consistía en una moto que circulaba en un escenario con dos niveles posibles, donde cada nivel establecía una composición de muros contra los que chocarse, y dejaba una estela de color amarillo por donde circulaba. 

En la fase actual, hay una variedad de hasta 5 escenarios con composiciones diferentes cada uno de ellos. Actualmente hay dos motos pero se puede extender hasta 4 haciendo un simple cambio en el código. Estas motos se controlan con las flechas direccionales y con A y D, aunque también se pueden controlar con mando. 


Además de esto, como se dijo, se han añadido diferentes Power Ups a lo largo del escenario con un Sprite personalizado para cada uno de los once y creados por nosotros mismos. Estos Power Ups, dan ciertos potenciadores que, normalmente duran un tiempo determinado o tienen un número limitado. Junto a esto se encuentran las trampas colocadas por todo el escenario, que serán un impedimento más y te matarán si te chocas con ellas.

#### Power-Ups
![ASSETS_FINAL_V1](https://user-images.githubusercontent.com/45218480/68715916-5a3d5b00-05a3-11ea-9031-a39620935048.png)


A la hora de comenzar el juego, hay un menú con diferentes opciones que te permite jugar, ver la pantalla de puntuación con los jugadores que más puntos hayan obtenido, hacer ciertos ajustes o salir del juego. Una vez se de a *jugar* se deberá crear una partida, cosa que nos será útil en fases posteriores para el juego en línea.

#### Pantalla de Menú
![Captura](https://user-images.githubusercontent.com/45218480/68753517-7a9e0180-0605-11ea-867b-ac887ea3d657.PNG)

#### Creación de partida
![Captura2](https://user-images.githubusercontent.com/45218480/68753639-af11bd80-0605-11ea-9d28-b8c237855050.PNG)

#### Gameplay
![Captura3](https://user-images.githubusercontent.com/45218480/68753760-d6688a80-0605-11ea-8b96-d29e3de1c383.PNG)


#### Ranking (falta por implementar)
![RANKING_GENERAL](https://user-images.githubusercontent.com/45218480/68718893-e3a45b80-05aa-11ea-99e3-b11dd18e9bf7.png)


El sistema de físicas que utilizamos es el propio de Phaser 3 y, principalmente usamos es el overlap para detectar colisiones y poder actuar entre ellas. Las motos se mueven con un método Update que llama Phaser, actualizando de esta manera su rotación y su posición. Este método también es usado por los Power Ups que son lanzados.

Se cargan los niveles a través de un cargador que ordena las coordenadas y permite saber el orden necesario para las colisiones. El choque contra los muros, tanto exteriores como interiores, son gestionados por, como se ha mencionado antes, un único método que destruye la moto y genera una animación de partículas.

Por último, si hablamos en lo referente al apartado sonoro, el videojuego reproduce el sonido del motor cuando la moto circula y si se choca, suena un gran sonido de explosión. En el menú, tendremos una música que te pone en tensión y una canción rock durante la partida.

# Fase 3

## Navegación
Se ha puesto una pantalla para iniciar sesión o crear la cuenta si no tienes una cuenta creada. Si se tiene una cuenta creada se mostrará por pantalla y se podrá iniciar sesión. Para crear una es necesario darle a añadir la cuenta y ahí se rellenan los datos de usuario y contraseña y se le da a crear cuenta.

![Captura](https://user-images.githubusercontent.com/45218480/70569094-87c4f680-1b99-11ea-868f-2644fb7d33ac.PNG)
![95abfece3becddce17043b9ae4adba80](https://user-images.githubusercontent.com/45218480/70570817-ed66b200-1b9c-11ea-9dbc-c4cbd321a3af.png)

El juego vendrá con tu nombre de usuario asociado una vez iniciada la partida. Con tu usuario irán asignadas las características que desees. 

![Captura](https://user-images.githubusercontent.com/45218480/70637479-995cdb80-1c37-11ea-9ea8-44d8cdcd5a3b.PNG)

Por ejemplo, si en ajustes desactivas la música, nueva opción implementada, cada vez que inicies sesión la partida estará por defecto con el sonido desactivado.

![Captura](https://user-images.githubusercontent.com/45218480/70573917-2dc92e80-1ba3-11ea-9ca1-7baae121c113.PNG)

Tras esto se podrá jugar al videojuego que ya vimos, pero ahora con trampas y con música de fondo. 

![Captura](https://user-images.githubusercontent.com/45218480/70574125-a4fec280-1ba3-11ea-92f4-acb5ebe9aa49.PNG)

Tras finalizar cada ronda, te saldrá una opción que es pulsar el Espacio para continuar con la ronda siguiente o Esc para salir al menú. Tras cada ronda la puntuación se irá acumulando.

![Captura](https://user-images.githubusercontent.com/45218480/70637057-e2f8f680-1c36-11ea-8568-b563e68f169a.PNG)

Por último, podremos ver un ranking de puntuación con el usuario de quien haya logrado dicha puntuación.

![Captura](https://user-images.githubusercontent.com/45218480/70637687-ee005680-1c37-11ea-9a6d-30e201eaeefd.PNG)

Como funcionalidades extras, hemos añadido una pequeña pantalla de juego en la que se nos muestra cómo se juega, las funciones básicas de los powerups y los controles.

![Captura](https://user-images.githubusercontent.com/45218480/70637193-205d8400-1c37-11ea-8666-c2ce0f13fd53.PNG)

Por último, este juego fue hecho por: 

![Captura](https://user-images.githubusercontent.com/45218480/70643865-15f4b780-1c42-11ea-866c-6214bdcdb4a6.PNG)

## Diagrama de clases y API REST
No hemos utilizado templates por lo que no están.

![Captura](https://user-images.githubusercontent.com/45218480/70634683-f86c2180-1c32-11ea-9868-22b62a0c52de.PNG)


## Instrucciones precisas para ejecutar la aplicación

Intrucciones para ejecutar el juego (recomendable):
1. Descargar el .jar y ponerlo en una carpeta
2. Abrir la consola de comandos e ir hasta la carpeta en la que se ha guardado el .jar
3. Ejecutar el comando java -jar server-0.0.1-SNAPSHOT.jar
4. Abrir en el navegador de Google Chrome una pestaña y escribir: localhost:8080/client/index.html
5. Disfrutar del juego!

Otra forma de hacerlo es a través del entorno Intellij:
1. Se abre la carpeta server del proyecto
2. Se compila abriéndose el servidor
3. Abrir en el navegador de Google Chrome una pestaña y escribir: localhost:8080/client/index.html
4. Disfrutar del juego!


# Fase 4

## Documentación del protocolo sobre WebSockets

Las funcionalidades añadidas por Websocket han sido la conexión entre el servidor y el cliente, pudiendo acceder a una misma partida, de quien haya abierto el servidor, pudiendo mirar sus puntuaciones y unirse quien tenga su dirección IP. Se deberá de crear una cuenta nueva y se podrán crear partidas públicas y privadas, siendo estas últimas con contraseña.

![Captura](https://user-images.githubusercontent.com/45218480/72114007-86c2e880-3342-11ea-99c2-78e3575b77eb.PNG)

Además, se quedará esperando a los jugadores hasta que estén el número definido al crear la partida y una vez creada se podrá jugar.

![Captura](https://user-images.githubusercontent.com/45218480/72114067-b70a8700-3342-11ea-96fc-f34aee491a1d.PNG)

El servidor websocket mantiene la lista de partidas, así como los jugadores que forman parte de cada partida. 

El estado de la partida se mantiene en un cliente, que hace de host de la partida, y el servidor de websocket se encarga de redirigir los mensajes enviados por los clientes de la forma adecuada.

Hay dos endpoints con protocolo websocket:

game-manager: encargado de la gestión de partidas. 

Comandos de cliente a servidor:

ADD_GAME: Creación de partida.

{
   command: “ADD_GAME”,
   player: <uuid del usuario>,
   name: <nombre de la partida>
   private: <true: partida privada, false: partida pública>,
   minplayers: <número de jugadores>
}

JOIN_GAME: El usuario se conecta a una partida.

{
   command: “JOIN_GAME”,
   game: <id del juego>,
   player: <uuid del jugador>
}

Comandos de servidor a cliente:
	
GAME_ADDED: Se ha creado una partida (enviado al creador de la misma).

{
   command: “GAME_ADDED”,
   data: <datos del juego añadido, incluye el id generado>
}
   
GAME_JOINED: Se ha accedido a una partida (enviado al que se conecta)

Respuesta:
{
   command: “GAME_JOINED”,
   data: <datos del juego>
}

UPDATE_GAMES: Actualización de la lista de partidas.

{
   command: “UPDATE_GAMES”,
   data: <lista de partidas actualizada>
}


game-play: encargado de la transimisión del estado de la partida

Comandos de cliente a servidor y retransmisiones:

JOIN_GAME: el usuario se ha conectado a la partida

{
   command: ”JOIN_GAME”,
   game: <id de la partida>,
   player: <uuid del jugador>
}

GAME_STARTED: la partida ha comenzado (enviado por el host de la partida). El servidor lo retransmite a todos los jugadores de la partida.

{
   command: “GAME_STARTED”,
   game: <id de la partida>,
   player: <uuid del jugador>,
   data: <datos de la partida>
}

GAME_UPDATED: actualización de información de la partida (enviado por el host de la partida). El servidor lo retransmite a todos los jugadores de la partida.

{
   command: “GAME_STARTED”,
   game: <id de la partida>,
   player: <uuid del jugador>,
   type: <tipo de actualización>
   … datos dependientes del tipo de actualizacion
}

INPUT: el jugador ha pulsado una tecla (enviado por todos los jugadores salvo el host de la partida). Se reenvia al host de la partida.

{
   command: “INPUT”,
   game: <id de la partida>,
   player: <uuid del jugador>,
   input: <tipo de entrada>
}

COUNTDOWN: una cuenta atrás está en marcha (enviado por el host de la partida). El servidor lo retransmite a todos los jugadores de la partida.

{
   command: “COUNTDOWN”,
   game: <id de la partida>,
   player: <uuid del jugador>,
   seconds: <segundos restantes>
}


## Diagrama de clases y API REST

![Anarcho-capitalist_flag svg](https://user-images.githubusercontent.com/45218480/72113148-f08dc300-333f-11ea-80cd-3ec24aa063e1.png)


# Fase 5

## Documentación de errores


#### Referencias

Web libre de derechos para música de fondo: https://patrickdearteaga.com/es/musica-arcade/
Efectos de sonido:
-http://soundbible.com/1722-Cordless-Drill-2.html
-https://www.findsounds.com/ISAPI/search.dll?keywords=laser
