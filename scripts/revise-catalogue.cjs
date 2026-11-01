// Reproducible application of the catalogue/content decisions reviewed on 30/10/2026.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const file=path.resolve(__dirname,'../public/js/dados.js');
const source=fs.readFileSync(file,'utf8'),ctx={window:{}};vm.runInNewContext(source,ctx);
const descriptions=Object.fromEntries(`
Agachamento com peso corporal|Com os pés inteiros apoiados, flexione joelhos e quadril para agachar. Mantenha o tronco controlado e os joelhos acompanhando os pés; retorne sem saltar.
Ponte de glúteos no solo|Deite de costas, com joelhos flexionados e pés apoiados. Eleve e abaixe o quadril com controle, sem arquear excessivamente a lombar ou apoiar o peso no pescoço.
Ponte de quadril com apoio dos calcanhares|Deite de costas, com calcanhares afastados do quadril, joelhos parcialmente flexionados e pontas dos pés elevadas. Pressione os calcanhares no chão para elevar o quadril; retorne sem deslizar os pés.
Elevação de panturrilhas em pé sem carga|Em pé, com joelhos estendidos sem forçá-los para trás, eleve os dois calcanhares juntos e abaixe com controle. Evite saltar ou usar os joelhos para impulsionar.
Flexão Pike no solo|Apoie mãos e pés no chão e eleve o quadril em V invertido. Flexione os cotovelos aproximando a cabeça do solo à frente das mãos; empurre para retornar, sem apoiar peso na cabeça.
Flexão com mãos próximas|Apoie as mãos mais próximas que na flexão padrão, em posição confortável para os punhos. Desça e suba com o corpo alinhado e os cotovelos próximos ao tronco.
Flexão de Braço (Padrão)|Apoie mãos e pontas dos pés no chão. Flexione os cotovelos aproximando o peito do solo e empurre para retornar, mantendo cabeça, tronco e quadril alinhados.
Flexão Inclinada (Mãos no banco)|Apoie as mãos em um banco firme e os pés no chão. Aproxime o peito do banco e empurre para retornar, movimentando o corpo alinhado como uma unidade.
Flexão Declinada (Pés no banco)|Apoie os pés em um banco firme e as mãos no chão. Desça e suba mantendo cabeça, tronco e quadril alinhados, sem deixar a lombar ceder.
Supino Reto com Barra|Deite no banco reto com pés firmes e cabeça, costas e quadril apoiados. Desça a barra em direção ao peito e empurre com controle, sem quicar no corpo; mantenha punhos alinhados.
Supino Reto com Halteres|Deite no banco reto com pés firmes. Baixe os halteres ao lado do peito e empurre os dois juntos, preservando os apoios e sem bater os pesos no alto.
Supino Reto na Máquina|Ajuste o assento e as empunhaduras para o peito conforme a máquina. Com pés firmes e costas apoiadas, empurre e retorne seguindo a trajetória, sem projetar o tronco.
Supino Inclinado com Barra|Deite no banco inclinado com pés firmes e corpo apoiado. Desça a barra em direção à parte superior do peito e empurre com controle, mantendo punhos alinhados aos antebraços.
Supino Inclinado com Halteres|Deite no banco inclinado, com pés firmes e cabeça, costas e quadril apoiados. Baixe os halteres ao lado da parte superior do peito e empurre os dois juntos com controle.
Supino Inclinado na Máquina|Ajuste o assento para as empunhaduras indicadas para supino inclinado. Mantenha pés firmes e costas apoiadas; empurre e retorne sem perder o apoio do tronco.
Supino Declinado com Barra|Use banco próprio para supino declinado, estabilizando as pernas nos apoios. Com o corpo apoiado, desça a barra em direção ao peito e empurre sem quicar.
Supino Declinado com Halteres|No banco declinado, estabilize as pernas nos apoios próprios. Baixe os halteres ao lado do peito e empurre os dois juntos, mantendo cabeça, costas e quadril apoiados.
Crucifixo Reto com Halteres|Deite no banco reto com halteres acima do peito e palmas frente a frente. Abra e feche os braços em arco, mantendo cotovelos levemente flexionados, sem transformar em supino.
Crucifixo Inclinado com Halteres|Deite no banco inclinado com halteres acima do peito e palmas frente a frente. Abra os braços em arco até onde controlar e retorne preservando a leve flexão dos cotovelos.
Voador (Peck Deck)|Ajuste banco e apoios conforme o equipamento. Com costas apoiadas, aproxime os braços à frente do peito e retorne de forma controlada, sem projetar o tronco.
Crossover Polia Alta|Use duas polias altas e uma alça em cada mão. Com base firme e cotovelos levemente flexionados, aproxime as mãos em arco diagonal para baixo; retorne sem embalar o tronco.
Crossover Polia Média|Use duas polias aproximadamente na altura dos ombros. Com base firme e cotovelos levemente flexionados, aproxime as mãos à frente do peito em arco horizontal e retorne com controle.
Crossover Polia Baixa|Use duas polias baixas e uma alça em cada mão. Conduza os braços em arco para cima e à frente da parte superior do peito; retorne sem elevar os ombros ou embalar.
Barra Fixa Pronada (Pull-up)|Segure a barra com palmas para a frente e pés suspensos. Eleve o corpo conduzindo cotovelos para baixo e desça com controle, sem balançar as pernas ou projetar a cabeça.
Puxada Alta (Pegada Aberta)|Ajuste o apoio das coxas e use pegada pronada mais aberta que os ombros, confortável. Puxe pela frente em direção ao peito e retorne sem embalar o tronco.
Puxada Alta Supinada|Ajuste o apoio das coxas e segure a barra com palmas voltadas para você. Puxe pela frente em direção ao peito e retorne com controle, mantendo o tronco estável.
Puxada Alta na Máquina|Ajuste assento e apoios conforme a máquina. Conduza os cotovelos para baixo para puxar e retorne com controle, mantendo o tronco estável e sem usar balanço.
Remada Curvada com Barra|Com pegada pronada, joelhos levemente flexionados e tronco inclinado pelo quadril, puxe a barra ao abdômen. Retorne sem levantar o tronco para impulsionar a carga.
Remada Unilateral (Serrote)|Apoie uma mão e o joelho do mesmo lado no banco, com o outro pé no chão. Puxe o halter à lateral do tronco e desça sem girar o corpo. Meta por braço.
Remada Baixa no Cabo (Triângulo)|Sente com pés nos apoios e joelhos levemente flexionados. Com palmas frente a frente no triângulo, puxe ao abdômen e retorne sem embalar o tronco.
Remada Máquina Apoiada no Peito|Ajuste assento e apoio do peito. Com pés firmes e peito apoiado, puxe as empunhaduras conduzindo cotovelos para trás e retorne com controle. Confira a trajetória própria da máquina.
Remada Cavalinho (T-Bar)|Use barra fixada em landmine e empunhadura compatível. Incline o tronco pelo quadril, puxe em direção ao abdômen e retorne sem levantar o corpo para impulsionar.
Pulldown no Cabo (Braços Estendidos)|De frente para a polia alta, segure a barra pronada. Com cotovelos levemente flexionados, conduza-a em arco até as coxas e retorne sem transformar em extensão de tríceps.
Levantamento Terra (Convencional)|Comece com barra no chão próxima às canelas e mãos por fora das pernas. Estabilize o tronco e levante estendendo joelhos e quadril; devolva a barra com controle, sem quicar.
Extensão Lombar (Banco Romano)|Ajuste o apoio para permitir movimento pelo quadril e fixe os pés nos suportes próprios. Incline pelo quadril com coluna estável e retorne alinhando tronco e pernas, sem arquear as costas.
Agachamento com Barra nas Costas|Ajuste suportes e segurança do rack. Apoie a barra na musculatura superior das costas, estabilize os pés e agache flexionando joelhos e quadril. Retorne mantendo barra estável e pés apoiados.
Agachamento Goblet com Halter|Segure um halter com ambas as mãos junto ao peito. Flexione joelhos e quadril para agachar e retorne com controle, mantendo a carga próxima ao corpo e os pés apoiados.
Agachamento no Smith|Ajuste barra sobre a musculatura das costas e travas de segurança. Posicione os pés conforme a trajetória do equipamento; agache e retorne com controle, sem impulso.
Leg Press 45º|Ajuste o leg press 45º conforme o equipamento. Com pés inteiros na plataforma e costas e quadril apoiados, flexione os joelhos e empurre com controle, acompanhando a direção dos pés.
Hack Machine|Apoie costas e ombros na máquina e pés inteiros na plataforma. Libere o mecanismo conforme o equipamento; desça e suba flexionando joelhos e quadril, preservando os apoios.
Cadeira Extensora|Ajuste assento, eixo dos joelhos e rolo próximo aos tornozelos conforme a máquina. Estenda os joelhos e retorne com controle, mantendo costas e quadril apoiados, sem impulsionar o tronco.
Afundo / Avanço|Mantenha um pé à frente e outro atrás, com apoio traseiro no antepé. Desça e suba sem mudar os pés. Complete as repetições de uma perna antes de trocar. Meta por perna.
Afundo com Halteres|Segure um halter em cada mão e mantenha base alternada. Desça e suba sem dar passos, completando um lado antes de trocar. Meta por perna da frente.
Agachamento Búlgaro com Halteres|Segure um halter em cada mão e apoie o pé traseiro em banco firme. Com pé da frente inteiro no chão, desça e retorne com controle. Complete um lado antes de trocar. Meta por perna.
RDL com Barra|Em pé com barra próxima às pernas e joelhos levemente flexionados, leve o quadril para trás para inclinar o tronco. Retorne estendendo o quadril sem arquear a lombar; alcançar o chão não é a meta.
RDL com Halteres|Mantenha halteres próximos às pernas e joelhos levemente flexionados. Leve o quadril para trás e incline o tronco com controle; retorne pela extensão do quadril sem buscar o chão.
Mesa Flexora (Deitado)|Deite de barriga para baixo e ajuste o rolo próximo aos tornozelos. Flexione os joelhos e retorne com controle, sem levantar o quadril ou arquear as costas.
Cadeira Flexora (Sentado)|Ajuste assento, eixo dos joelhos e apoios das coxas e tornozelos. Flexione os joelhos e retorne com controle, mantendo costas e quadril apoiados.
Elevação Pélvica com Barra|Apoie a parte superior das costas em banco firme e a barra sobre a dobra do quadril, com proteção adequada. Eleve e abaixe o quadril com pés firmes, sem terminar arqueando a lombar.
Elevação Pélvica na Máquina|Ajuste apoios e proteção do quadril conforme a máquina. Com pés firmes, eleve o quadril e retorne com controle, sem finalizar a subida arqueando a lombar.
Cadeira Abdutora|Ajuste assento e apoios externos das coxas conforme a máquina. Afaste as pernas e retorne com controle, mantendo o tronco estável e sem usar impulso.
Cadeira Adutora|Ajuste assento e apoios internos das coxas conforme a máquina. Aproxime as pernas e retorne com controle, mantendo o tronco estável e sem usar impulso.
Panturrilha em Pé na Máquina|Ajuste os apoios da máquina e mantenha antepés firmes. Eleve e abaixe os calcanhares juntos com controle, mantendo joelhos estáveis e sem saltar.
Panturrilha Sentado (Máquina)|Ajuste o apoio das coxas com joelhos flexionados e antepés firmes na base. Eleve e abaixe os dois calcanhares juntos, sem impulsionar os joelhos.
Panturrilha no Leg Press|Use leg press 45º com cabeça, costas e quadril apoiados. Mantenha antepés firmes na plataforma e movimente os tornozelos para elevar e abaixar os calcanhares, com joelhos estáveis.
Desenvolvimento Militar com Barra|Em pé, mantenha barra à frente dos ombros e pés firmes. Empurre acima da cabeça e retorne com controle, sem impulso das pernas ou inclinação excessiva das costas.
Desenvolvimento com Halteres|Sente em banco com encosto, mantendo costas apoiadas e pés firmes. Com halteres ao lado dos ombros, empurre acima da cabeça e retorne com controle, sem arquear excessivamente as costas.
Desenvolvimento na Máquina|Ajuste banco e empunhaduras conforme a máquina. Com pés firmes e costas apoiadas, empurre para cima e retorne com controle, sem levantar o quadril.
Elevação Lateral com Halteres|Em pé, mantenha tronco estável e cotovelos levemente flexionados. Eleve os dois braços lateralmente até aproximadamente a altura dos ombros e retorne sem impulso.
Elevação Lateral no Cabo|Use polia baixa e fique de lado, segurando a alça com o braço mais afastado. Eleve lateralmente com cotovelo levemente flexionado e retorne sem embalar. Meta por braço.
Elevação Frontal com Halteres|Em pé, com palmas voltadas ao corpo, eleve os dois halteres à frente até aproximadamente os ombros. Desça sem embalar o tronco. Uma subida e descida de ambos conta uma repetição.
Crucifixo Invertido com Halteres|Sente no banco com pés firmes e tronco inclinado à frente. Abra os braços com cotovelos levemente flexionados e retorne sem levantar o tronco ou transformar em remada.
Crucifixo Invertido na Máquina (Peck Deck)|Ajuste banco e empunhaduras para crucifixo invertido. Com o peito apoiado, abra os braços e retorne com controle, sem projetar o tronco ou encolher os ombros.
Face Pull no Cabo|Use acessório de corda na polia e base firme. Puxe em direção ao rosto, separando as pontas e conduzindo cotovelos para os lados. Retorne sem jogar o corpo para trás.
Remada Alta no Cabo|Use barra reta na polia baixa e pegada pronada. Eleve próxima ao corpo conduzindo cotovelos para os lados, até a altura dos ombros, e retorne sem embalar.
Rosca Direta com Barra|Em pé, segure a barra com palmas para cima e braços próximos ao corpo. Flexione os cotovelos e retorne com controle, sem projetá-los à frente ou embalar o tronco.
Rosca Alternada com Halteres|Em pé, flexione um cotovelo por vez, deixando a palma para cima durante a subida. Desça com controle e mantenha tronco estável. Meta por braço: 10 significa 10 em cada.
Rosca no Cabo (Polia Baixa)|Segure a barra na polia baixa com palmas para cima. Flexione os cotovelos e retorne com braços próximos ao corpo, sem inclinar o tronco ou projetar cotovelos à frente.
Rosca Scott na Máquina|Ajuste o banco para apoiar a parte posterior dos braços e alinhar cotovelos conforme a máquina. Flexione e estenda os cotovelos com controle, sem levantar o tronco.
Rosca Martelo com Halteres|Em pé, mantenha palmas voltadas uma para a outra e punhos alinhados. Flexione os dois cotovelos e retorne sem girar as mãos, projetar os braços ou embalar o corpo.
Rosca Inversa no Cabo|Use barra reta na polia baixa com pegada pronada. Flexione e estenda os cotovelos com braços próximos ao corpo e punhos alinhados, sem impulsionar o tronco.
Tríceps Testa com Barra W|Deite no banco reto com a barra W acima do peito. Mantendo braços apontados para cima, flexione cotovelos aproximando a barra da testa sem tocar; estenda para retornar com controle.
Tríceps Pulley (Barra Reta/V)|Use barra reta ou V na polia alta, identificando o acessório. Com cotovelos próximos ao corpo, estenda para baixo e retorne sem usar o peso do corpo.
Tríceps Corda no Cabo|Use acessório de corda na polia alta. Com cotovelos próximos ao corpo, estenda para baixo e retorne com controle, sem deslocar braços à frente ou empurrar com o corpo.
Tríceps Francês com Halter|Em pé, posicione um halter em uma mão acima da cabeça. Flexione o cotovelo levando-o atrás da cabeça e estenda sem arquear o tronco. Um braço por vez; meta por braço.
Tríceps Coice (Kickback)|Incline o tronco em base alternada e apoie a mão livre na própria coxa. Com braço de trabalho junto ao tronco, estenda e flexione o cotovelo sem balançar. Meta por braço.
Mergulho no Banco|Apoie mãos na borda do banco e pés no chão, com joelhos flexionados. Mantenha quadril próximo ao banco; desça e suba pelos cotovelos com amplitude controlada.
Tríceps Máquina / Dip Machine|Na máquina sentada, ajuste assento e apoios. Com pés firmes e tronco estável, empurre as alavancas para baixo estendendo os cotovelos e retorne sem levantar o corpo.
Abdominal Supra no Solo|Deite de costas com joelhos flexionados e pés apoiados. Eleve ombros e parte superior das costas pela flexão do tronco e retorne, sem sentar ou puxar a cabeça.
Abdominal Infra no Solo|Deite de costas com joelhos flexionados e pés elevados. Enrole o quadril em direção ao tronco, retirando-o ligeiramente do chão, e retorne sem balançar as pernas.
Abdominal na Máquina|Ajuste assento e apoios conforme a máquina. Flexione o tronco aproximando tórax e pelve e retorne com controle, sem movimentar a carga apenas pelos braços.
Prancha Isométrica Frontal|Apoie antebraços e pontas dos pés no chão, com cotovelos abaixo dos ombros. Sustente cabeça, tronco e quadril alinhados, respirando sem deixar a lombar ceder. Meta em segundos.
Abdominal Bicicleta|Deite de costas e mantenha mãos junto à cabeça sem puxá-la. Alterne a aproximação de um joelho com a rotação do tronco em sua direção, estendendo a outra perna. Meta por lado.
Russian Twist com Halter|Sente com joelhos flexionados e pés apoiados. Segure um halter com ambas as mãos junto ao peito, incline levemente o tronco e gire alternadamente, sem mover apenas os braços. Meta por lado.
Tríceps Testa com Halteres|Deite no banco reto com palmas frente a frente e halteres acima do peito. Flexione cotovelos baixando-os ao lado da cabeça e estenda; execute os dois braços juntos, estáveis.
Tríceps Francês no Cabo|Use acessório de corda e posicione os braços acima da cabeça, com base firme. Flexione e estenda os cotovelos com ambos os braços, mantendo tronco estável e sem arquear excessivamente a lombar.
Rosca Scott com Barra|Apoie a parte posterior dos braços no banco Scott. Use barra reta ou W, identificando qual. Flexione e estenda cotovelos com controle, sem tirar os braços do apoio ou impulsionar o tronco.
Remada Alta com Barra|Em pé, segure a barra pronada aproximadamente na largura dos ombros. Eleve próxima ao corpo conduzindo cotovelos aos lados, sem ultrapassar os ombros; retorne sem embalar.
Rosca Inversa com Barra|Segure a barra pronada e mantenha braços próximos ao corpo. Flexione e estenda cotovelos com punhos alinhados, preservando a pegada e sem inclinar o tronco para ajudar.
Mergulho nas Paralelas|Segure as barras próprias e sustente o corpo com pés suspensos. Flexione e estenda cotovelos com controle dos ombros e tronco, sem balançar as pernas ou usar impulso.
Russian Twist sem Carga|Sente com joelhos flexionados e pés apoiados. Incline levemente o tronco, mantenha mãos à frente do peito e gire alternadamente com controle, sem levantar os pés. Meta por lado.
Abdominal Supra com Halter|Deite com joelhos flexionados e pés apoiados, segurando um halter junto ao peito com as duas mãos. Eleve ombros e parte superior das costas e retorne sem impulsionar a carga.
Prancha Isométrica Lateral|Apoie um antebraço, com cotovelo abaixo do ombro, e a lateral dos pés. Eleve e sustente o quadril alinhado ao tronco, sem girar o corpo. Registre a duração real de cada lado separadamente.
Barra Fixa Supinada (Chin-up)|Com palmas voltadas para você e pés suspensos, eleve o corpo e retorne controlando a descida. Evite impulsionar as pernas ou esticar o pescoço para alcançar a barra.
Barra Fixa com Apoio dos Pés|Use pegada supinada e banco firme para os pés, em altura compatível com a barra. Puxe com assistência das pernas e desça com controle, sem saltar para iniciar.
Agachamento Frontal com Barra|No rack, apoie a barra na parte anterior dos ombros e estabilize-a com mãos e cotovelos elevados à frente. Agache e retorne com controle, preservando o apoio nos ombros.
Leg Press Horizontal|Ajuste assento e apoie os pés inteiros na plataforma. Empurre e retorne com costas e quadril encostados, joelhos acompanhando os pés e sem solavancos.
Panturrilha em Pé no Smith|Ajuste barra sobre a musculatura superior das costas e travas conforme o Smith. Com pés firmes e joelhos estáveis, eleve e abaixe os calcanhares juntos sem saltar.
Puxada Alta Neutra|Ajuste o apoio das coxas e use empunhaduras com palmas frente a frente. Puxe pela frente em direção ao peito e retorne, mantendo tronco estável e sem balanço.
Agachamento Búlgaro sem Carga|Apoie um pé atrás em banco firme e mantenha o pé da frente inteiro no chão. Desça e suba com controle; complete um lado antes de trocar. Meta por perna.
Supino no Solo com Halteres|Deite com joelhos flexionados e pés apoiados. Baixe os halteres até os braços encostarem suavemente no solo e empurre, sem usar o chão para ganhar impulso.
Ponte de Quadril Unilateral no Solo|Deite com um pé apoiado e a outra perna suspensa, com joelho flexionado. Eleve e abaixe o quadril sem girar a pelve; complete um lado antes de trocar. Meta por perna apoiada.
Flexão de Joelhos com Caminhada dos Calcanhares|Eleve o quadril em ponte no solo. Afaste e aproxime os calcanhares em pequenos passos alternados, mantendo o quadril controlado. Uma ida e volta completa conta uma repetição.
RDL Unilateral sem Carga|Apoie o peso em uma perna com joelho levemente flexionado. Leve o quadril para trás inclinando o tronco e a outra perna para trás; retorne sem girar. Meta por perna apoiada.
Abdução de Quadril Deitado de Lado|Deite de lado com perna inferior flexionada para apoio e superior estendida. Eleve a perna de cima e retorne sem girar quadril ou tronco. Meta por perna.
Adução de Quadril Deitado de Lado|Deite de lado com perna inferior estendida e superior cruzada à frente, pé no chão. Eleve a perna de baixo e retorne sem girar o quadril. Meta por perna.
Elevação de Panturrilhas Sentado sem Carga|Sente em banco firme com joelhos flexionados. Eleve os dois calcanhares juntos e abaixe com antepés no chão e coxas estáveis, sem impulsionar os joelhos.
Elevação de Panturrilhas Sentado com Halteres|Sente em banco firme, com joelhos flexionados e um halter em cada coxa próximo aos joelhos, estabilizado pelas mãos. Eleve e abaixe os dois calcanhares juntos: um ciclo conta uma repetição.
Extensão Lombar no Solo|Deite de barriga para baixo com braços ao lado do corpo e pernas apoiadas. Eleve ligeiramente a parte superior do tronco e retorne, olhando para o chão e mantendo quadril apoiado.
Remada Invertida em Barra Baixa|Segure uma barra baixa fixa com pegada pronada. Com pés apoiados e corpo alinhado, puxe o peito em direção à barra e retorne, sem deixar o quadril cair ou impulsioná-lo.
Rosca com Halteres em Supinação|Em pé, com palmas para a frente, flexione os dois cotovelos juntos e retorne com braços próximos ao corpo e punhos alinhados. Uma subida e descida de ambos conta uma repetição.
Tríceps Testa no Solo com Halteres|Deite no chão com joelhos flexionados e pés apoiados. Com halteres acima do peito e palmas frente a frente, flexione e estenda cotovelos com braços estáveis, sem bater os pesos no solo.
Extensão de Tríceps com Peso Corporal na Parede|Apoie mãos em parede firme acima dos ombros e afaste os pés. Flexione cotovelos aproximando a testa da parede e estenda para retornar, com corpo alinhado e mãos apoiadas.
Flexão com Joelhos Apoiados|Apoie mãos e joelhos no chão, alinhando o corpo dos joelhos à cabeça. Aproxime o peito do solo e empurre para retornar, sem deixar o quadril para trás ou a lombar ceder.
Remada Unilateral em Pé com Halter|Em base alternada, incline o tronco e apoie a mão livre na própria coxa. Puxe o halter à lateral do tronco e desça sem girar os ombros. Meta por braço.
Rosca Corporal em Barra Baixa|Segure barra baixa fixa com pegada supinada e pés apoiados. Com braços elevados, flexione cotovelos aproximando a testa das mãos e retorne com corpo alinhado, sem transformar em remada.
Crucifixo no Solo com Halteres|Deite com joelhos flexionados, pés apoiados e halteres acima do peito, palmas frente a frente. Abra em arco com cotovelos levemente flexionados até o limite do solo e retorne sem bater os braços.
Crucifixo Invertido Curvado em Pé com Halteres|Em pé com joelhos levemente flexionados, incline o tronco pelo quadril. Abra os braços lateralmente e retorne com cotovelos levemente flexionados, sem levantar o tronco ou fazer remada.
Rosca Inversa com Halteres|Com palmas para trás, flexione os dois cotovelos juntos mantendo pegada pronada e punhos alinhados. Desça com controle, preservando os braços próximos ao corpo e sem girar as mãos.
Remada Bilateral Curvada com Halteres|Com um halter em cada mão, incline o tronco pelo quadril e flexione levemente os joelhos. Puxe ambos ao tronco e retorne, preservando a inclinação sem impulso.
Panturrilha em Pé com Joelhos Flexionados e Apoio|Segure parede ou apoio firme para equilíbrio e mantenha joelhos flexionados. Eleve e abaixe os dois calcanhares juntos, preservando a flexão dos joelhos sem puxar o corpo pelo apoio.
Rosca Corporal Sentada com Resistência da Perna|Sente em banco firme, apoie o cotovelo em um joelho e a mão supinada sob a outra perna estendida. Flexione contra a resistência da perna e retorne sem impulsioná-la. Meta por braço.
`.trim().split('\n').map(line=>line.split('|')));
const perSide=new Set(['Remada Unilateral (Serrote)','Elevação Lateral no Cabo','Rosca Alternada com Halteres','Tríceps Francês com Halter','Tríceps Coice (Kickback)','Afundo / Avanço','Afundo com Halteres','Agachamento Búlgaro com Halteres','Agachamento Búlgaro sem Carga','Ponte de Quadril Unilateral no Solo','RDL Unilateral sem Carga','Abdução de Quadril Deitado de Lado','Adução de Quadril Deitado de Lado','Remada Unilateral em Pé com Halter','Rosca Corporal Sentada com Resistência da Perna','Abdominal Bicicleta','Russian Twist com Halter','Russian Twist sem Carga']);
const oneDumbbell=new Set(['Agachamento Goblet com Halter','Remada Unilateral (Serrote)','Tríceps Francês com Halter','Tríceps Coice (Kickback)','Abdominal Supra com Halter','Russian Twist com Halter','Remada Unilateral em Pé com Halter']);
const labels={'Desenvolvimento com Halteres':'Desenvolvimento Sentado com Halteres e Encosto','Crucifixo Invertido com Halteres':'Crucifixo Invertido Sentado com Halteres','Tríceps Francês com Halter':'Tríceps Francês Unilateral em Pé com Halter','Extensão Lombar (Banco Romano)':'Extensão de Quadril no Banco Romano','Afundo / Avanço':'Afundo Parado sem Carga','Afundo com Halteres':'Afundo Parado com Halteres','Barra Fixa com Apoio dos Pés':'Barra Fixa Supinada com Apoio dos Pés','Remada Invertida em Barra Baixa':'Remada Invertida Pronada em Barra Baixa','Tríceps Máquina / Dip Machine':'Tríceps na Máquina Sentada — Dip','Prancha Isométrica Frontal':'Prancha Frontal sobre os Antebraços','Panturrilha no Leg Press':'Panturrilha no Leg Press 45º','Rosca com Halteres em Supinação':'Rosca Direta com Halteres — Pegada Supinada','Abdominal Infra no Solo':'Abdominal Reverso no Solo','Ponte de quadril com apoio dos calcanhares':'Ponte de Quadril no Solo — Calcanhares Afastados','Flexão de Joelhos com Caminhada dos Calcanhares':'Ponte com Caminhada dos Calcanhares'};
const specificResources={'Desenvolvimento com Halteres':['dumbbells','backrest-bench'],'Crossover Polia Alta':['dual-cable','cable-handles'],'Crossover Polia Média':['dual-cable','cable-handles'],'Crossover Polia Baixa':['dual-cable','cable-handles'],'Tríceps Corda no Cabo':['cable','cable-rope'],'Tríceps Francês no Cabo':['cable','cable-rope'],'Face Pull no Cabo':['cable','cable-rope'],'Remada Cavalinho (T-Bar)':['barbell','plates','landmine','row-handle'],'Extensão de Tríceps com Peso Corporal na Parede':['wall']};
let reviewed=0;
for(const item of ctx.window.dictionaryData){
    item.catalogueRevision=2;item.selectable=item.group!=='Cardio/Mobilidade';
    if(!item.selectable)continue;
    if(!descriptions[item.name])throw new Error('Missing description: '+item.name);
    item.desc=descriptions[item.name];item.displayName=labels[item.name]||item.name;reviewed++;
    let action=item.movementPattern.replace(/^flexao-cotovelo-.+$/,'flexao-cotovelo').replace('extensao-cotovelo-acima','extensao-cotovelo').replace('flexao-plantar-joelho-flexionado','flexao-plantar');
    if(item.name==='Extensão Lombar (Banco Romano)')action='extensao-quadril';
    const grip=/Inversa|Pronada|Remada Curvada com Barra|Remada Alta|Remada Invertida/.test(item.name)?'pronada':/Martelo|Neutra|Triângulo/.test(item.name)?'neutra':/Rosca|Supinada|Barra Fixa com Apoio/.test(item.name)?'supinada':null;
    item.classification={version:1,region:item.group,action,grip,emphasis:item.muscleFocus.filter(x=>!['costas-remada','core-flexao','core-estabilidade','core-retroversao','cadeia-posterior'].includes(x)),functionFocus:item.muscleFocus.filter(x=>['costas-remada','core-flexao','core-estabilidade','core-retroversao','cadeia-posterior'].includes(x))};
    if(item.name==='Extensão Lombar (Banco Romano)'){item.classification.region='Pernas';item.classification.emphasis=['gluteo-maximo','isquiotibiais'];}
    const load=item.equip==='Halter'?'dumbbells-total':item.equip==='Barra'?'bar-total':['Máquina','Cabo'].includes(item.equip)?'machine':'bodyweight';
    const count=item.name==='Prancha Isométrica Lateral'?'duration-side':item.name==='Prancha Isométrica Frontal'?'duration':item.name==='Flexão de Joelhos com Caminhada dos Calcanhares'?'cycle':perSide.has(item.name)?'per-side':'total';
    item.executionProfile={version:1,movementId:item.id,variant:item.id+':review-2',label:item.displayName,count,load,weights:load==='dumbbells-total'?(oneDumbbell.has(item.name)?1:2):0,resources:specificResources[item.name]||item.resources};
    if(item.equip==='Máquina')item.executionProfile.resources=[...new Set([...item.executionProfile.resources,'apparatus:'+item.id])];
    if(item.name==='Rosca Scott com Barra')item.executionVariants=['Barra reta','Barra W'];
    if(item.name==='Tríceps Pulley (Barra Reta/V)')item.executionVariants=['Barra reta','Barra V'];
    if(item.executionVariants)item.executionProfile.choices=item.executionVariants;
}
if(reviewed!==122)throw new Error('Unexpected active count: '+reviewed);
fs.writeFileSync(file,source.replace(/window\.dictionaryData = \[[\s\S]*?\r?\n\];/,'window.dictionaryData = '+JSON.stringify(ctx.window.dictionaryData,null,4)+';'));
console.log('Reviewed catalogue:',reviewed,'active; retired records preserved.');
