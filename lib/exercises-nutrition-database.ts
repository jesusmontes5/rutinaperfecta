/**
 * Base de datos completa de ejercicios con descripción técnica
 * y planes nutricionales específicos por objetivo
 */

export interface ExerciseDetail {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';
  targetMuscle: string[];
  description: string;
  form: string[]; // Paso a paso de la forma correcta
  variations: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  safetyTips: string[];
}

export interface NutritionPlan {
  objective: 'masa' | 'grasa' | 'mantener';
  level: 'principiante' | 'intermedio' | 'avanzado';
  weight: number; // kg
  details: {
    tdee: number; // Total Daily Energy Expenditure
    dailyCalories: number;
    proteinG: number;
    carbsG: number;
    fatsG: number;
    mealTiming: string;
    supplements?: string[];
    restrictedFoods?: string[];
  };
}

// EJERCICIOS CON DESCRIPCIÓN TÉCNICA DETALLADA
export const exerciseDatabase: ExerciseDetail[] = [
  // PECHO
  {
    id: 'bench_press',
    name: 'Press de Banca Plano',
    category: 'chest',
    targetMuscle: ['pecho mayor', 'triceps', 'hombro anterior'],
    description: 'Ejercicio compuesto fundamental para desarrollo pectoral. Gran generador de tensión mecánica.',
    form: [
      'Acuéstate en el banco con espalda plana, pies firmemente en el piso',
      'Agarra la barra con ancho de hombros (aproximadamente 52cm)',
      'Baja la barra de forma controlada hacia la parte media del pecho (3-4 segundos)',
      'Evita rebotar: detente 1-2cm antes del pecho',
      'Empuja explosivamente hacia arriba, extendiendo codos completamente',
      'Respira: inhala bajada, exhala subida',
      'Series: 4x8-10, descanso 2-3 minutos entre sets'
    ],
    variations: [
      'Press Inclinado (40°) - enfatiza pecho superior',
      'Press Declinado (20°) - enfatiza pecho inferior',
      'Press con Mancuernas - mayor rango movimiento'
    ],
    difficulty: 'intermediate',
    safetyTips: [
      'Nunca reboces la barra en el pecho',
      'Mantén escápulas retractadas durante todo el movimiento',
      'Los codos deben formar ~45° respecto al cuerpo, NO 90°',
      'Si sientes dolor en hombro anterior, reduce peso o cambia ángulo',
      'Usa spotter para maxes o altos volúmenes'
    ]
  },
  {
    id: 'incline_bench',
    name: 'Press Inclinado con Barra',
    category: 'chest',
    targetMuscle: ['pecho superior', 'hombro anterior', 'triceps'],
    description: 'Variante del press de banca que enfatiza el pecho superior. Excelente para simetría.',
    form: [
      'Ajusta el banco a 30-45 grados de inclinación',
      'Posición igual al press plano pero con ángulo arriba',
      'Baja hacia base de cuello (arriba del pecho plano)',
      'Mantén control: nunca abandones el peso',
      'Empuja hacia el techo, ligeramente atrás hacia tu cara',
      'Series típicas: 3-4x8-12, descanso 90-120 segundos'
    ],
    variations: [
      'Mancuernas inclinadas - permite mayor ROM',
      'Press inclinado con agarre inverso',
      'Máquina prensa inclinada'
    ],
    difficulty: 'intermediate',
    safetyTips: [
      'El ángulo NO debe ser mayor a 60° (reduce efectividad pectoral)',
      'Cuidado con el strain de hombro en ángulos muy altos',
      'Ajusta cada ejercicio según tu biomecánica personal'
    ]
  },
  {
    id: 'dumbbell_flyes',
    name: 'Cruces de Pecho con Mancuernas',
    category: 'chest',
    targetMuscle: ['pecho mayor', 'pecho menor'],
    description: 'Aislamiento pectoral que enfatiza el estiramiento. Complemento perfecto a press.',
    form: [
      'Acuéstate en banco plano con mancuernas a la altura del pecho, codos ligeramente flexionados',
      'Brazos abiertos: forma un "arco" como si abrazaras un árbol',
      'Baja las mancuernas en movimiento de semicírculo controlado (3 segundos)',
      'Siente el estiramiento en el pecho en el punto más bajo',
      'Vuelve al inicio del movimiento apretando con los pectorales',
      'Respira: inhala bajada, exhala subida',
      'Series: 3-4x10-15, descanso 60-90 segundos'
    ],
    variations: [
      'Cruces en máquina',
      'Cruces en cable',
      'Cruces inclinados'
    ],
    difficulty: 'beginner',
    safetyTips: [
      'Nunca uses peso muy pesado (es aislamiento, no compuesto)',
      'Mantén ligera flexión de codos (NO estirado completamente)',
      'No dejes que las mancuernas caigan bruscamente'
    ]
  },

  // ESPALDA
  {
    id: 'barbell_row',
    name: 'Remo con Barra Palmas Abajo',
    category: 'back',
    targetMuscle: ['dorsal ancho', 'romboides', 'trapecio', 'bíceps'],
    description: 'Ejercicio compuesto fundamental para construcción de espalda ancha. Pareja del press de banca.',
    form: [
      'Colócate ante la barra con pies a ancho de hombros',
      'Inclínate hasta 45 grados (NO horizontal total)',
      'Agarra la barra con ancho de hombros, palmas hacia abajo',
      'Estira los brazos completamente al inicio (posición de "laxitud")',
      'Tira la barra hacia tu abdomen/cintura, codos pegados al cuerpo',
      'Contrae escápulas maximalmente en el punto más alto',
      'Baja de forma controlada (2 segundos bajada)',
      'Series: 4x6-10, descanso 2-3 minutos'
    ],
    variations: [
      'Remo Pronado (palmas arriba) - más bíceps',
      'Remo en T',
      'Remo a un brazo'
    ],
    difficulty: 'intermediate',
    safetyTips: [
      'CRÍTICO: Nunca redondees la espalda (mantén neutro la columna)',
      'Los codos deben pasar por debajo del cuerpo, no para afuera',
      'Evita hiperextender la espalda al tirar',
      'Si duele espalda baja, reduce peso y mejora postura inicial'
    ]
  },
  {
    id: 'lat_pulldown',
    name: 'Lat Machine / Polea Frontal',
    category: 'back',
    targetMuscle: ['dorsal ancho', 'bíceps', 'trapecio'],
    description: 'Versión segura de dominadas. Perfecta para principiantes y cuando necesitas acumular volumen.',
    form: [
      'Siéntate en la máquina con muslos bajo la almohadilla de seguridad',
      'Agarra la barra con ancho de hombros a hombros+',
      'Inclina torso ligeramente atrás (15 grados)',
      'Tira la barra hacia el pecho superior, codos hacia atrás',
      'Siente que el dorsal se contrae maximalmente',
      'Punto más bajo: barra toca parte superior pecho',
      'Vuelve al inicio de forma controlada (2 segundos)',
      'Series: 3-4x8-12, descanso 90 segundos'
    ],
    variations: [
      'Agarre pronado/supinado',
      'Ancho más cerrado o abierto (trabaja diferentes fibras)',
      'Pulldown reverso'
    ],
    difficulty: 'beginner',
    safetyTips: [
      'No uses momentum excesivo (sin balanceos)',
      'Mantén posición sentada estable',
      'Si duele el cuello, reduce rango o peso'
    ]
  },
  {
    id: 'pull_ups',
    name: 'Dominadas / Pull-ups',
    category: 'back',
    targetMuscle: ['dorsal ancho', 'bíceps', 'trapecio'],
    description: 'Ejercicio compuesto avanzado. Desarrolla espalda ancha, fuerza funcional y brazos.',
    form: [
      'Agárrate con palmas alejadas de ti (pronado), ancho>hombros',
      'Brazos extendidos: punto inicial',
      'Tira de tu cuerpo hacia la barra utilizando dorsal',
      'Barbilla debe pasar sobre la barra (rango completo)',
      'Baja de forma controlada por 3 segundos',
      'Series típicas: 3-5x5-12 (depende del peso corporal)',
      'Descanso: 2-3 minutos entre sets'
    ],
    variations: [
      'Dominadas supinadas (palmas hacia ti) - más bíceps',
      'Dominadas neutras (palmas paralelas)',
      'Con peso adicional (cinturón)',
      'Asistidas en máquina',
      'Bandas elásticas para principiantes'
    ],
    difficulty: 'advanced',
    safetyTips: [
      'Requiere fuerza base: comienza con asistidas o bandas',
      'Nunca hagas movimientos oscilantes/oscillación (kipping)',
      'Completa el rango total (dejse caer completamente)',
      'Si duelen codos, reduce volumen'
    ]
  },

  // PIERNAS
  {
    id: 'barbell_squat',
    name: 'Sentadilla con Barra',
    category: 'legs',
    targetMuscle: ['cuádriceps', 'glúteos', 'isquiotibiales', 'aductores'],
    description: 'REY de ejercicios de pierna. Mayor generador de testosterona y crecimiento muscular sistémico.',
    form: [
      'Coloca la barra en hombros (no cuello), agarrando ancho+',
      'Pies al ancho de hombros, puntas ligeramente afuera (10-20°)',
      'Mira adelante o ligeramente arriba (NO hacia abajo)',
      'Desciende controlado: cadera baja a profundidad donde muslo<horizontal',
      'CRÍTICO: Espalda recta, NO redondeada, rodillas alineadas sobre pies',
      'Ascenso: extiende caderas Y rodillas simultáneamente',
      'Pausa en la cima 1 segundo, contrae glúteos',
      'Series: 4x6-10 (fuerza/hipertrofia), descanso 2-3 min'
    ],
    variations: [
      'Sentadilla High-Bar: más vértical, más cuads',
      'Sentadilla Low-Bar: más lean forward, más glúteos/espalda',
      'Sentadilla Bulgarian: una pierna',
      'Sentadilla en máquina Smith',
      'Goblet Squat: mancuerna al pecho'
    ],
    difficulty: 'intermediate',
    safetyTips: [
      'NUNCA sacrifiques forma por peso',
      'Si duelen rodillas, mejora profundidad/ángulos',
      'Evita colapsar hacia adentro (rodillas adentro = lesión)',
      'Postura neutra de columna es NO NEGOCIABLE',
      'Comparte peso entre talón y antepié (NO todo punta)'
    ]
  },
  {
    id: 'romanian_deadlift',
    name: 'Peso Muerto Rumano (RDL)',
    category: 'legs',
    targetMuscle: ['isquiotibiales', 'glúteos', 'espalda baja', 'dorsal'],
    description: 'Desarrolla cadena posterior: isquios y glúteos. Mejora postura y salud de espalda.',
    form: [
      'Posición inicial: pies a ancho de hombros, barra en manos',
      'Espalda completamente recta (NO redondeada)',
      'Rodillas LIGERAMENTE flexionadas (NO estiradas), mantén así todo el movimiento',
      'Cadera hacia atrás (bisagra de cadera) como si abrieras una puerta',
      'Barra baja a lo largo de piernas, mantén contacto',
      'Profundidad: donde sientas estiramiento máximo en isquios (no obligatoriamente al piso)',
      'Ascenso: empuja cadera adelante, contrae glúteos',
      'Series: 3-4x8-12, descanso 90-120 segundos'
    ],
    variations: [
      'RDL a un brazo',
      'RDL con mancuernas (permite mayor ROM)',
      'RDL en máquina',
      'Good Mornings'
    ],
    difficulty: 'intermediate',
    safetyTips: [
      'Mantén rodillas ligeramente flexionadas ES CLAVE',
      'Espalda recta siempre: el movimiento es en cadera, NO espalda',
      'Si no sientes isquios, améjora movilidad (yoga/mobility work)',
      'Carga moderadamente hasta dominar la forma'
    ]
  },
  {
    id: 'leg_press',
    name: 'Prensa de Pierna (Leg Press)',
    category: 'legs',
    targetMuscle: ['cuádriceps', 'glúteos', 'isquiotibiales'],
    description: 'Ejercicio seguro y controlado. Excelente para volumen, recuperación de lesiones, principiantes.',
    form: [
      'Siéntate en la máquina con espalda/cabeza apoyadas en el respaldo',
      'Pies a ancho de hombros en la plataforma',
      'Manos en los laterales (agarre de seguridad)',
      'Desciende lentamente hasta donde caderas<rodillas (90° aprox)',
      'NO: Baja tan profundo que redondeas espalda (riesgo lumbar)',
      'Ascenso: extiende piernas completamente',
      'Repite sin "lockout" en rodillas (mantén ligera flexión)',
      'Series: 3-4x10-15, descanso 90 segundos'
    ],
    variations: [
      'Leg press estrecho (más cuads)',
      'Leg press ancho (más glúteos)',
      'Una pierna a la vez',
      'Calf raises en leg press'
    ],
    difficulty: 'beginner',
    safetyTips: [
      'Nunca jamás bajes demasiado (evita lesión lumbar)',
      'Mantén espalda recta contra respaldo',
      'No uses demasiado peso tempra para lesión',
      'Knees-over-toes sí, pero no exagerado'
    ]
  },

  // HOMBROS
  {
    id: 'military_press',
    name: 'Press Militar',
    category: 'shoulders',
    targetMuscle: ['deltoides anterior', 'deltoides medio', 'triceps', 'trapecio'],
    description: 'El "squatofthe upper body". Desarrolla hombros esféricos, fuerza funcional, estabilidad.',
    form: [
      'De pie o sentado con barra a la altura de hombro/clavícula',
      'Codos directamente debajo de la barra',
      'Agarre: ancho de hombros aproximadamente',
      'Core tenso, glúteos contraídos',
      'Empuja la barra hacia arriba y ligeramente atrás',
      'Punto más alto: barra sobre cabeza, brazos extendidos',
      'Descenso controlado (2-3 segundos)',
      'Series: 4x6-10, descanso 2 minutos'
    ],
    variations: [
      'Press Sentado (más enfoque en deltoides, menos estabilidad)',
      'Press con Mancuernas',
      'Machine Press'
    ],
    difficulty: 'intermediate',
    safetyTips: [
      'NO arquees excesivamente espalda (minimiza arco)',
      'Mantén core tenso todo el movimiento',
      'Cuidado con pinzamiento de hombro si es sensible',
      'Carga moderadamente hasta dominar'
    ]
  },
  {
    id: 'lateral_raise',
    name: 'Elevaciones Laterales con Mancuernas',
    category: 'shoulders',
    targetMuscle: ['deltoides medio'],
    description: 'Aislamiento para deltoides medio. Esencial para hombros anchos y esféricos.',
    form: [
      'De pie con mancuernas al lado (agarre neutral)',
      'Ligera flexión de codos (15-20 grados), mantén así',
      'Eleva mancuernas hacia los lados hasta altura hombro',
      'Punto más alto: brazos paralelos al piso',
      'Punto más bajo: mancuernas casi tocando muslos laterales',
      'Movimiento controlado: 2-3 segundos en ambas direcciones',
      'Series: 3-4x12-15, descanso 60 segundos'
    ],
    variations: [
      'Elevaciones en máquina',
      'Cable lateral raise',
      'Elevadores frontales (deltoides anterior)',
      'Reverse pec deck'
    ],
    difficulty: 'beginner',
    safetyTips: [
      'NO uses demasiado peso (es fácil hacer trampa)',
      'Mantén ligera flexión de codos (no totalmente estirado)',
      'No dejes que muñecas se doblen (brazo recto)',
      'Si duele cuello, quizá cargues hombros (relaja trapecios)'
    ]
  },
];

// PLANES NUTRICIONALES ESPECÍFICOS
export const nutritionPlans = {
  masa_principiante_80kg: {
    objective: 'masa',
    level: 'principiante',
    weight: 80,
    details: {
      tdee: 2400, // Estimado para sedentario+entrenamiento
      dailyCalories: 2800, // Superávit +400 kcal
      proteinG: 160, // 2.0g/kg (máximo para hipertrofia)
      carbsG: 350, // 4.375g/kg (fuente de energía)
      fatsG: 78, // 0.975g/kg (hormonal, mínimo 0.8g/kg)
      mealTiming: `
        Comida 1 (Desayuno - 7am): 60g proteína, 80g carbs, 15g grasa
          - 4 huevos enteros + 2 claras (36g proteína, 8g grasa)
          - 100g avena cruda (27g carbs, 5g proteína)
          -1 plátano mediano (27g carbs)
          - 1 cucharada aceite oliva (120 kcal, 14g grasa)
          TOTAL: ~60g proteína, 80g carbs, 25g grasa = 720 kcal

        Comida 2 (Snack - 10am): 25g proteína, 50g carbs
          - Batido: 1 scoop whey protein (25g prot), plátano, escoop PB
          TOTAL: ~25g prot, 50g carbs, 15g grasa = 450 kcal

        Comida 3 (Almuerzo - 1pm): 60g proteína, 80g carbs, 15g grasa  
          - 250g pollo cocinado (60g proteína)
          - 200g arroz blanco (50g carbs)
          - 150g batata (30g carbs)
          - Spray cocina (0g)
          TOTAL: ~60g proteína, 80g carbs, 5g grasa = 700 kcal

        Comida 4 (Pre-entreno - 4:30pm): 30g proteína, 60g carbs
          - Bagel blanco (50g carbs)
          - 2 scoops maltodextrina en agua (60g carbs)
          - 30g proteína (polvos o isolate)
          TOTAL: ~30g prot, 110g carbs, 2g grasa = 550 kcal

        Comida 5 (Post-entreno - 6:30pm): 40g proteína, RÁPIDO
          - Batido: 40g whey, 50g dextrose, 10g BCAA
          - Seguidapor fruta
          TOTAL: ~40g prot, 50g carbs = 360 kcal

        Comida 6 (Cena - 8pm): 60g proteína, 40g carbs, 20g grasa
          - 300g salmón (60g prot, 20g grasa)
          - 250g papa al horno (50g carbs)
          - Verduras (20g carbs)
          TOTAL: ~60g prot, 70g carbs, 20g grasa = 800 kcal

        Macro Total DIARIO:
        - Proteína: 275g (ligero por encima = seguridad)
        - Carbs: 410g (ligeramente arriba = energía)
        - Grasas: 77g (perfecto para hormonal)
        - Calorías: ~4180 kcal (bastante para masa)

        AJUSTES SEMANA 2-4:
        - Si NO ganas peso: suma 200 kcal (más carbs o grasas)
        - Si ganas 1.5-2kg/semana: perfecto (mantén)
        - Si ganas >2kg/semana: subirá grasa = reduce 200 kcal
      `,
      supplements: [
        'Creatina Monohidrato: 5g diarios (efecto probado en hipertrofia)',
        'Multivitamínico diario (seguro nutricional)',
        'Omega-3: 2-3g EPA/DHA (inflamación, recuperación)',
        'Magnesio: 400mg antes de dormir (mejora sueño y recuperación)',
        'Vitamina D3: 4000-5000 IU si no hay sol (hormonal)'
      ],
      restrictedFoods: [
        'Alcohol: maximiza resultados = cero alcohol',
        'Ultra-procesados/Frituras: saturan calorías sin nutrientes',
        'Refrescos azucarados: calorías vacías',
        'Harinas refinadas (excepto periódicamente): picos de glucosa'
      ]
    }
  },

  grasa_intermedio_85kg: {
    objective: 'grasa',
    level: 'intermedio',
    weight: 85,
    details: {
      tdee: 2550, // Estimado mantenimiento
      dailyCalories: 2100, // Déficit -450 kcal (agresivo pero seguro)
      proteinG: 204, // 2.4g/kg (MÁXIMA PRIORITARIO en cutting)
      carbsG: 178, // 2.1g/kg (reducido)
      fatsG: 70, // 0.82g/kg (mínimo para hormonal)
      mealTiming: `
        ESTRUCTURA: 4 comidas principales + snacks proteicos
        
        Comida 1 (7am): 50g prot, 50g carbs, 8g grasa
          - 200g de claras de huevo (40g prot) + 2 yemas (5g grasa)
          - 50g avena (18g carbs)
          - Café negro sin azúcar
          TOTAL: 50g prot, 50g carbs, 10g grasa = 450 kcal

        Comida 2 (10:30am): 40g prot, 40g carbs
          - Batido: 40g whey, 1 plátano, 5g PB
          TOTAL: 40g prot, 45g carbs, 5g grasa = 350 kcal

        Comida 3 (2pm): 50g prot, 40g carbs, 8g grasa (Almuerzo)
          - 250g pechuga pollo a la plancha (50g prot)
          - 150g arroz integral (40g carbs)
          - Spray cocina
          TOTAL: 50g prot, 40g carbs, 2g grasa = 440 kcal

        Comida 4 (5pm): 30g prot, 30g carbs (Pre-entreno)
          - 150g papa blanca (30g carbs)
          - 30g aislado proteína
          TOTAL: 30g prot, 30g carbs, 0g grasa = 240 kcal

        Comida 5 (7pm): 34g prot, 18g carbs, 8g grasa (Post-entreno)
          - Batido: 40g whey, 20g dextrose
          -Seguida por 150g salmón en cena
          TOTAL: ~34g prot, 18g carbs, 18g grasa = 400 kcal

        Snacks ad-lib (No limitar):
          - Agua infinita
          - Café negro
          - Té sin azúcar
          - Caldo bajo sodio
          - Chicles sin azúcar

        Macro Total DIARIO:
        - Proteína: 204g (crítico para preservar masa)
        - Carbs: 178g (estratégico, NO extremadamente bajo)
        - Grasas: 70g (suficiente para hormonal y función)
        - Calorías: 2100 kcal = -450 del TDEE

        AJUSTES:
        - Semana 1-2: Peso baja 2-3 lbs (agua + glucógeno)
        - Semana 3+: Target 0.5-1 lb/semana (grasa pura)
        - Si deja de bajar 2 semanas: reduce 200 kcal más
      `,
      supplements: [
        'Creatina: 5g diarios (preserva masa en déficit)',
        'Cafeína: 200-400mg mañana (acelera metabolismo, mejora enfoque)',
        'L-Carnitina: 3g diarios (puede acelerar pérdida grasa)',
        'Beta-Alanina: 3-5g diarios (mejora rendimiento cardio HIIT)',
        'Multivitamín: insurance contra deficiencias (importante en déficit)'
      ],
      restrictedFoods: [
        'Aceites/grasas innecesarias: controllas al spray cocina',
        'Alcohol: 7 kcal/g = metabolismo lento',
        'Snacks hipercalóricos: es fácil overflow 200 kcal',
        'Azúcares refinados: picos de glucosa = hambre',
        'Harinas blancas: prefiere brown rice, avena integral'
      ]
    }
  },

  mantener_principiante_75kg: {
    objective: 'mantener',
    level: 'principiante',
    weight: 75,
    details: {
      tdee: 2300,
      dailyCalories: 2300, // Balance calórico exacto
      proteinG: 120, // 1.6g/kg (suficiente para mantener)
      carbsG: 260, // 3.5g/kg
      fatsG: 64, // 0.85g/kg
      mealTiming: `
        OBJETIVO: Flexibilidad + Sostenibilidad = ADHERENCIA

        Comida 1 (Desayuno): 40g prot, 60g carbs
          - 2-3 huevos enteros + avena = base
          TOTAL: ~40g prot, 60g carbs = 500 kcal

        Comida 2 (Almuerzo): 50g prot, 70g carbs, 10g grasa
          - Proteína de elección (pechuga, pezco, tofu)
          - Carbohidrato de elección (arroz, papa, fideos)
          - Verduras ad-lib
          TOTAL: ~50g prot, 70g carbs, 10g grasa = 650 kcal

        Comida 3 (Merienda): 20g prot, 30g carbs
          - Fruta + yogur o batido rápido
          TOTAL: ~20g prot, 30g carbs, 3g grasa = 280 kcal

        Comida 4 (Cena): 50g prot, 60g carbs, 15g grasa
          - Similar a almuerzo con más libertad
          TOTAL: ~50g prot, 60g carbs, 15g grasa = 700 kcal

        Flexibilidad:
        - 1-2 comidas semanales "libres" de tamaño moderado OK
        - No límites estrictos = mejor adherencia
        - Intuitivo: cuando tengas hambre de verdad = come

        Macro Total DIARIO:
        - Proteína: 160g (suficiente)
        - Carbs: 220g (energía diaria)
        - Grasas: 43g (hormonal)
        - Calorías: 2200-2300 = estable
      `,
      supplements: [
        'Proteína en polvo: opcional (conveniencia)',
        'Multivitamín: 1x diario (seguro)',
        'Omega-3: 2g si consumes poco pescado',
        'Magnesio: 400mg mejora sueño',
        'Vitamina D3: según deficiencia individual'
      ],
      restrictedFoods: [
        'NADA estrictamente prohibido: mentalidad sostenible',
        'Reduce: ultra-procesados, refrescos',
        'Alcohol: 1-2 bebidas ocasionalmente OK'
      ]
    }
  }
};

export default {
  exerciseDatabase,
  nutritionPlans,
};
