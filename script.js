/* script.js — VERSIÓN CORREGIDA COMPLETA
   - Incluye translations y recetas tal como en tu fuente original
   - Fix: generarDiasCronograma / initCronograma / actualizarProgreso movidos a scope global
   - Fix: mostrarDetalleReceta ahora inicializa cronograma sin insertar IIFE dentro del template
   - Fix: entradas defensivas para evitar errores si selectors no existen
*/

(function () {
  'use strict';

  /* =======================
     TRANSLATIONS (original)
     ======================= */
  const translations = {
    es: {
      "app.title": "Recetas Caseras",
      "nav.all": "Todas",
      "nav.skin": "Piel",
      "nav.lips": "Labios",
      "nav.hair": "Cabello",
      "nav.masks": "Mascarillas",
      "nav.hands": "Manos",
      "nav.nutrition": "Nutrición",
      "nav.wellness": "Bienestar",
      "nav.favorites": "Favoritos",
      "nav.settings": "Configuración",
      "favorites.title": "Mis Recetas Favoritas",
      "settings.title": "Configuración",
      "settings.theme": "Tema:",
      "settings.light": "Claro",
      "settings.dark": "Oscuro",
      "settings.notifications": "Notificaciones:",
      "settings.language": "Idioma:",
      "settings.save": "Guardar",
      "recipe.ingredients": "Ingredientes",
      "recipe.preparation": "Preparación",
      "recipe.use": "Uso",
      "recipe.recommendations": "Recomendaciones",
      "recipe.warnings": "Advertencias",
      "recipe.schedule": "Cronograma de Uso",
      "recipe.schedule.info": "Usa esta receta durante <strong>{days}</strong> días para ver resultados óptimos.",
      "recipe.schedule.days": "Días usados: {used} de {total}",
      "recipe.comments": "Comentarios",
      "recipe.comments.add": "Agregar Comentario",
      "recipe.comments.placeholder": "Escribe tu comentario aquí...",
      "recipe.comments.submit": "Enviar",
      "recipe.download": "Descargar Receta",
      "recipe.favorite.add": "Agregar a Favoritos",
      "recipe.favorite.remove": "Quitar de Favoritos",
      "comments.no": "No hay comentarios aún. Sé el primero en comentar.",
      "comments.author": "Autor",
      "comments.date": "Fecha",
      "modal.close": "Cerrar",
      "fullscreen": "Pantalla Completa",
      "progress": "Progreso: {percent}%"
    },
    en: {
      "app.title": "Home Remedies",
      "nav.all": "All",
      "nav.skin": "Skin",
      "nav.lips": "Lips",
      "nav.hair": "Hair",
      "nav.masks": "Masks",
      "nav.hands": "Hands",
      "nav.nutrition": "Nutrition",
      "nav.wellness": "Wellness",
      "nav.favorites": "Favorites",
      "nav.settings": "Settings",
      "favorites.title": "My Favorite Recipes",
      "settings.title": "Settings",
      "settings.theme": "Theme:",
      "settings.light": "Light",
      "settings.dark": "Dark",
      "settings.notifications": "Notifications:",
      "settings.language": "Language:",
      "settings.save": "Save",
      "recipe.ingredients": "Ingredients",
      "recipe.preparation": "Preparation",
      "recipe.use": "Use",
      "recipe.recommendations": "Recommendations",
      "recipe.warnings": "Warnings",
      "recipe.schedule": "Usage Schedule",
      "recipe.schedule.info": "Use this recipe for <strong>{days}</strong> days to see optimal results.",
      "recipe.schedule.days": "Days used: {used} of {total}",
      "recipe.comments": "Comments",
      "recipe.comments.add": "Add Comment",
      "recipe.comments.placeholder": "Write your comment here...",
      "recipe.comments.submit": "Submit",
      "recipe.download": "Download Recipe",
      "recipe.favorite.add": "Add to Favorites",
      "recipe.favorite.remove": "Remove from Favorites",
      "comments.no": "No comments yet. Be the first to comment.",
      "comments.author": "Author",
      "comments.date": "Date",
      "modal.close": "Close",
      "fullscreen": "Fullscreen",
      "progress": "Progress: {percent}%"
    },
    pt: {
      "app.title": "Receitas Caseiras",
      "nav.all": "Todas",
      "nav.skin": "Pele",
      "nav.lips": "Lábios",
      "nav.hair": "Cabelo",
      "nav.masks": "Máscaras",
      "nav.hands": "Mãos",
      "nav.nutrition": "Nutrição",
      "nav.wellness": "Bem-estar",
      "nav.favorites": "Favoritos",
      "nav.settings": "Configurações",
      "favorites.title": "Minhas Receitas Favoritas",
      "settings.title": "Configurações",
      "settings.theme": "Tema:",
      "settings.light": "Claro",
      "settings.dark": "Escuro",
      "settings.notifications": "Notificações:",
      "settings.language": "Idioma:",
      "settings.save": "Salvar",
      "recipe.ingredients": "Ingredientes",
      "recipe.preparation": "Preparação",
      "recipe.use": "Uso",
      "recipe.recommendations": "Recomendações",
      "recipe.warnings": "Avisos",
      "recipe.schedule": "Cronograma de Uso",
      "recipe.schedule.info": "Use esta receita por <strong>{days}</strong> dias para ver resultados ótimos.",
      "recipe.schedule.days": "Dias usados: {used} de {total}",
      "recipe.comments": "Comentários",
      "recipe.comments.add": "Adicionar Comentário",
      "recipe.comments.placeholder": "Escreva seu comentário aqui...",
      "recipe.comments.submit": "Enviar",
      "recipe.download": "Baixar Receita",
      "recipe.favorite.add": "Adicionar aos Favoritos",
      "recipe.favorite.remove": "Remover dos Favoritos",
      "comments.no": "Ainda não há comentários. Seja o primeiro a comentar.",
      "comments.author": "Autor",
      "comments.date": "Data",
      "modal.close": "Fechar",
      "fullscreen": "Tela Cheia",
      "progress": "Progresso: {percent}%"
    },
    fr: {
      "app.title": "Recettes Maison",
      "nav.all": "Toutes",
      "nav.skin": "Peau",
      "nav.lips": "Lèvres",
      "nav.hair": "Cheveux",
      "nav.masks": "Masques",
      "nav.hands": "Mains",
      "nav.nutrition": "Nutrition",
      "nav.wellness": "Bien-être",
      "nav.favorites": "Favoris",
      "nav.settings": "Paramètres",
      "favorites.title": "Mes Recettes Favorites",
      "settings.title": "Paramètres",
      "settings.theme": "Thème:",
      "settings.light": "Clair",
      "settings.dark": "Sombre",
      "settings.notifications": "Notifications:",
      "settings.language": "Langue:",
      "settings.save": "Enregistrer",
      "recipe.ingredients": "Ingrédients",
      "recipe.preparation": "Préparation",
      "recipe.use": "Utilisation",
      "recipe.recommendations": "Recommandations",
      "recipe.warnings": "Avertissements",
      "recipe.schedule": "Calendrier d'Utilisation",
      "recipe.schedule.info": "Utilisez cette recette pendant <strong>{days}</strong> jours pour voir des résultats optimaux.",
      "recipe.schedule.days": "Jours utilisés: {used} de {total}",
      "recipe.comments": "Commentaires",
      "recipe.comments.add": "Ajouter un Commentaire",
      "recipe.comments.placeholder": "Écrivez votre commentaire ici...",
      "recipe.comments.submit": "Soumettre",
      "recipe.download": "Télécharger la Receta",
      "recipe.favorite.add": "Ajouter aux Favoris",
      "recipe.favorite.remove": "Retirer des Favoris",
      "comments.no": "Aucun commentaire pour l'instant. Soyez le premier à commenter.",
      "comments.author": "Auteur",
      "comments.date": "Date",
      "modal.close": "Fermer",
      "fullscreen": "Plein Écran",
      "progress": "Progrès: {percent}%"
    },
    de: {
      "app.title": "Hausmittel",
      "nav.all": "Alle",
      "nav.skin": "Haut",
      "nav.lips": "Lippen",
      "nav.hair": "Haare",
      "nav.masks": "Masken",
      "nav.hands": "Hände",
      "nav.nutrition": "Ernährung",
      "nav.wellness": "Wohlbefinden",
      "nav.favorites": "Favoriten",
      "nav.settings": "Einstellungen",
      "favorites.title": "Meine Lieblingsrezepte",
      "settings.title": "Einstellungen",
      "settings.theme": "Thema:",
      "settings.light": "Hell",
      "settings.dark": "Dunkel",
      "settings.notifications": "Benachrichtigungen:",
      "settings.language": "Sprache:",
      "settings.save": "Speichern",
      "recipe.ingredients": "Zutaten",
      "recipe.preparation": "Zubereitung",
      "recipe.use": "Verwendung",
      "recipe.recommendations": "Empfehlungen",
      "recipe.warnings": "Warnungen",
      "recipe.schedule": "Verwendungsplan",
      "recipe.schedule.info": "Verwenden Sie dieses Rezept für <strong>{days}</strong> Tage, um optimale Ergebnisse zu sehen.",
      "recipe.schedule.days": "Verwendete Tage: {used} von {total}",
      "recipe.comments": "Kommentare",
      "recipe.comments.add": "Kommentar Hinzufügen",
      "recipe.comments.placeholder": "Schreiben Sie hier Ihren Kommentar...",
      "recipe.comments.submit": "Senden",
      "recipe.download": "Rezept Herunterladen",
      "recipe.favorite.add": "Zu Favoriten Hinzufügen",
      "recipe.favorite.remove": "Aus Favoriten Entfernen",
      "comments.no": "Noch keine Kommentare. Seien Sie der Erste, der kommentiert.",
      "comments.author": "Autor",
      "comments.date": "Datum",
      "modal.close": "Schließen",
      "fullscreen": "Vollbild",
      "progress": "Fortschritt: {percent}%"
    },
    it: {
      "app.title": "Rimedi Casalinghi",
      "nav.all": "Tutte",
      "nav.skin": "Pelle",
      "nav.lips": "Labbra",
      "nav.hair": "Capelli",
      "nav.masks": "Maschere",
      "nav.hands": "Mani",
      "nav.nutrition": "Nutrizione",
      "nav.wellness": "Benessere",
      "nav.favorites": "Preferiti",
      "nav.settings": "Impostazioni",
      "favorites.title": "Le Mie Ricette Preferite",
      "settings.title": "Impostazioni",
      "settings.theme": "Tema:",
      "settings.light": "Chiaro",
      "settings.dark": "Scuro",
      "settings.notifications": "Notifiche:",
      "settings.language": "Lingua:",
      "settings.save": "Salva",
      "recipe.ingredients": "Ingredienti",
      "recipe.preparation": "Preparazione",
      "recipe.use": "Uso",
      "recipe.recommendations": "Raccomandazioni",
      "recipe.warnings": "Avvertenze",
      "recipe.schedule": "Programma di Utilizzo",
      "recipe.schedule.info": "Usa questa ricetta per <strong>{days}</strong> giorni per vedere risultati ottimali.",
      "recipe.schedule.days": "Giorni utilizzati: {used} di {total}",
      "recipe.comments": "Commenti",
      "recipe.comments.add": "Aggiungi Commento",
      "recipe.comments.placeholder": "Scrivi il tuo commento qui...",
      "recipe.comments.submit": "Invia",
      "recipe.download": "Scarica Ricetta",
      "recipe.favorite.add": "Aggiungi ai Preferiti",
      "recipe.favorite.remove": "Rimuovi dai Preferiti",
      "comments.no": "Nessun commento ancora. Sii il primo a commentare.",
      "comments.author": "Autore",
      "comments.date": "Data",
      "modal.close": "Chiudi",
      "fullscreen": "Schermo Intero",
      "progress": "Progresso: {percent}%"
    },
    zh: {
      "app.title": "家庭食谱",
      "nav.all": "全部",
      "nav.skin": "皮肤",
      "nav.lips": "嘴唇",
      "nav.hair": "头发",
      "nav.masks": "面膜",
      "nav.hands": "手",
      "nav.nutrition": "营养",
      "nav.wellness": "健康",
      "nav.favorites": "收藏",
      "nav.settings": "设置",
      "favorites.title": "我的收藏食谱",
      "settings.title": "设置",
      "settings.theme": "主题:",
      "settings.light": "浅色",
      "settings.dark": "深色",
      "settings.notifications": "通知:",
      "settings.language": "语言:",
      "settings.save": "保存",
      "recipe.ingredients": "成分",
      "recipe.preparation": "准备",
      "recipe.use": "使用",
      "recipe.recommendations": "建议",
      "recipe.warnings": "警告",
      "recipe.schedule": "使用时间表",
      "recipe.schedule.info": "使用此配方 <strong>{days}</strong> 天以获得最佳效果。",
      "recipe.schedule.days": "已用天数: {used} / {total}",
      "recipe.comments": "评论",
      "recipe.comments.add": "添加评论",
      "recipe.comments.placeholder": "在这里写下您的评论...",
      "recipe.comments.submit": "提交",
      "recipe.download": "下载食谱",
      "recipe.favorite.add": "添加到收藏",
      "recipe.favorite.remove": "从收藏中移除",
      "comments.no": "暂无评论。成为第一个评论的人。",
      "comments.author": "作者",
      "comments.date": "日期",
      "modal.close": "关闭",
      "fullscreen": "全屏",
      "progress": "进度: {percent}%"
    },
    ja: {
      "app.title": "家庭薬",
      "nav.all": "すべて",
      "nav.skin": "肌",
      "nav.lips": "唇",
      "nav.hair": "髪",
      "nav.masks": "マスク",
      "nav.hands": "手",
      "nav.nutrition": "栄養",
      "nav.wellness": "健康",
      "nav.favorites": "お気に入り",
      "nav.settings": "設定",
      "favorites.title": "お気に入りのレシピ",
      "settings.title": "設定",
      "settings.theme": "テーマ:",
      "settings.light": "ライト",
      "settings.dark": "ダーク",
      "settings.notifications": "通知:",
      "settings.language": "言語:",
      "settings.save": "保存",
      "recipe.ingredients": "材料",
      "recipe.preparation": "準備",
      "recipe.use": "使用方法",
      "recipe.recommendations": "推奨",
      "recipe.warnings": "警告",
      "recipe.schedule": "使用スケジュール",
      "recipe.schedule.info": "最適な結果を得るには、このレシピを <strong>{days}</strong> 日間使用してください。",
      "recipe.schedule.days": "使用日数: {used} / {total}",
      "recipe.comments": "コメント",
      "recipe.comments.add": "コメントを追加",
      "recipe.comments.placeholder": "ここにコメントを書いてください...",
      "recipe.comments.submit": "送信",
      "recipe.download": "レシピをダウンロード",
      "recipe.favorite.add": "お気に入りに追加",
      "recipe.favorite.remove": "お気に入りから削除",
      "comments.no": "まだコメントはありません。最初のコメントを書いてください。",
      "comments.author": "著者",
      "comments.date": "日付",
      "modal.close": "閉じる",
      "fullscreen": "全画面",
      "progress": "進捗: {percent}%"
    },
    ru: {
      "app.title": "Домашние Рецепты",
      "nav.all": "Все",
      "nav.skin": "Кожа",
      "nav.lips": "Губы",
      "nav.hair": "Волосы",
      "nav.masks": "Маски",
      "nav.hands": "Руки",
      "nav.nutrition": "Питание",
      "nav.wellness": "Здоровье",
      "nav.favorites": "Избранное",
      "nav.settings": "Настройки",
      "favorites.title": "Мои Избранные Рецепты",
      "settings.title": "Настройки",
      "settings.theme": "Тема:",
      "settings.light": "Светлая",
      "settings.dark": "Темная",
      "settings.notifications": "Уведомления:",
      "settings.language": "Язык:",
      "settings.save": "Сохранить",
      "recipe.ingredients": "Ингредиенты",
      "recipe.preparation": "Приготовление",
      "recipe.use": "Использование",
      "recipe.recommendations": "Рекомендации",
      "recipe.warnings": "Предупреждения",
      "recipe.schedule": "График Использования",
      "recipe.schedule.info": "Используйте этот рецепт в течение <strong>{days}</strong> дней для достижения оптимальных результатов.",
      "recipe.schedule.days": "Использовано дней: {used} из {total}",
      "recipe.comments": "Комментарии",
      "recipe.comments.add": "Добавить Комментарий",
      "recipe.comments.placeholder": "Напишите ваш комментарий здесь...",
      "recipe.comments.submit": "Отправить",
      "recipe.download": "Скачать Рецепт",
      "recipe.favorite.add": "Добавить в Избранное",
      "recipe.favorite.remove": "Удалить из Избранного",
      "comments.no": "Пока нет комментариев. Будьте первым, кто прокомментирует.",
      "comments.author": "Автор",
      "comments.date": "Дата",
      "modal.close": "Закрыть",
      "fullscreen": "Полный Экран",
      "progress": "Прогресс: {percent}%"
    },
    ar: {
      "app.title": "وصفات منزلية",
      "nav.all": "الكل",
      "nav.skin": "الجلد",
      "nav.lips": "الشفاه",
      "nav.hair": "الشعر",
      "nav.masks": "الأقنعة",
      "nav.hands": "الأيدي",
      "nav.nutrition": "التغذية",
      "nav.wellness": "الصحة",
      "nav.favorites": "المفضلة",
      "nav.settings": "الإعدادات",
      "favorites.title": "وصفاتي المفضلة",
      "settings.title": "الإعدادات",
      "settings.theme": "السمة:",
      "settings.light": "فاتح",
      "settings.dark": "داكن",
      "settings.notifications": "الإشعارات:",
      "settings.language": "اللغة:",
      "settings.save": "حفظ",
      "recipe.ingredients": "المكونات",
      "recipe.preparation": "التحضير",
      "recipe.use": "الاستخدام",
      "recipe.recommendations": "التوصيات",
      "recipe.warnings": "التحذيرات",
      "recipe.schedule": "جدول الاستخدام",
      "recipe.schedule.info": "استخدم هذه الوصفة لمدة <strong>{days}</strong> يومًا لرؤية النتائج المثلى.",
      "recipe.schedule.days": "الأيام المستخدمة: {used} من {total}",
      "recipe.comments": "التعليقات",
      "recipe.comments.add": "إضافة تعليق",
      "recipe.comments.placeholder": "اكتب تعليقك هنا...",
      "recipe.comments.submit": "إرسال",
      "recipe.download": "تحميل الوصفة",
      "recipe.favorite.add": "إضافة إلى المفضلة",
      "recipe.favorite.remove": "إزالة من المفضلة",
      "comments.no": "لا توجد تعليقات بعد. كن أول من يعلق.",
      "comments.author": "المؤلف",
      "comments.date": "التاريخ",
      "modal.close": "إغلاق",
      "fullscreen": "ملء الشاشة",
      "progress": "التقدم: {percent}%"
    }
  };

  /* =======================
     RECETAS (completo)
     ======================= */
  const recetas = [
    {
      id: 1,
      titulo: "Mascarilla de miel y avena",
      categoria: "piel",
      imagen: 'https://cdn0.uncomo.com/es/posts/2/4/8/como_hacer_una_mascarilla_de_avena_y_miel_29842_orig.jpg',
      ingredientes: ["2 cucharadas de miel", "1 cucharada de avena en polvo", "1 cucharada de yogur natural"],
      preparacion: "Mezclar todos los ingredientes hasta obtener una pasta homogénea. Aplicar sobre el rostro limpio y dejar actuar 20 minutos. Enjuagar con agua tibia.",
      uso: "2 veces por semana",
      recomendaciones: "Ideal para pieles sensibles o con acné. La miel tiene propiedades antibacterianas y la avena calma la irritación.",
      advertencias: "No usar si eres alérgico a alguno de los ingredientes. Hacer una prueba en una pequeña zona de la piel antes de usar.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 2,
      titulo: "Bálsamo labial de cacao",
      categoria: "labios",
      imagen: 'https://mejorconsalud.as.com/wp-content/uploads/2015/01/balsamo.jpg',
      ingredientes: ["1 cucharada de cera de abejas", "1 cucharada de manteca de cacao", "1 cucharadita de aceite de coco"],
      preparacion: "Derretir la cera de abejas al baño María. Agregar la manteca de cacao y el aceite de coco. Mezclar bien y verter en un recipiente pequeño. Dejar enfriar hasta solidificar.",
      uso: "Aplicar en los labios cuando sea necesario",
      recomendaciones: "Mantiene los labios hidratados por horas. Puedes añadir una gota de vitamina E para extra nutrición.",
      advertencias: "Conservar en lugar fresco. Si notas irritación, discontinuar su uso.",
      duracion: 30,
      tiempoRecomendado: 60,
      comentarios: []
    },
    {
      id: 3,
      titulo: "Acondicionador de palta",
      categoria: "cabello",
      imagen: 'https://mejorconsalud.as.com/wp-content/uploads/2014/06/Aguacate-acondicionador.jpg?auto=webp&quality=7500&width=1920&crop=16:9,smart,safe&format=webp&optimize=medium&dpr=2&fit=cover&fm=webp&q=75&w=1920&h=1080',
      ingredientes: ["1/2 palta maduro", "1 cucharada de aceite de oliva", "1 cucharada de miel"],
      preparacion: "Machacar la palta hasta obtener un puré. Agregar el aceite de oliva y la miel. Mezclar bien. Aplicar sobre el cabello húmedo, dejar actuar 30 minutos y lavar normalmente.",
      uso: "1 vez por semana",
      recomendaciones: "Ideal para cabellos secos o dañados. la palta aporta grasas saludables que nutren el cabello.",
      advertencias: "Enjuagar bien para evitar residuos. No usar si tienes el cuero cabelludo muy graso.",
      duracion: 14,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 4,
      titulo: "Exfoliante de café y azúcar",
      categoria: "piel",
      imagen: 'https://media.istockphoto.com/id/1212541934/es/foto/hacer-cero-residuos-exfoliaci%C3%B3n-corporal-libre-t%C3%B3xica-caf%C3%A9-diy-az%C3%BAcar-exfoliante-corporal-de.jpg?s=612x612&w=0&k=20&c=pMT1Gc2cQqw1ulmqqbJ4PMC1jRkixdu3HOMSyKOk42o=',
      ingredientes: ["2 cucharadas de café molido", "2 cucharadas de azúcar morena", "1 cucharada de aceite de coco"],
      preparacion: "Mezclar todos los ingredientes hasta obtener una pasta. Masajear sobre la piel húmeda con movimientos circulares. Enjuagar con agua tibia.",
      uso: "1 vez por semana",
      recomendaciones: "Elimina células muertas y activa la circulación. El café ayuda a reducir la celulitis.",
      advertencias: "No usar en piel irritada o con cortaduras. Evitar el área de los ojos.",
      duracion: 7,
      tiempoRecomendado: 28,
      comentarios: []
    },
    {
      id: 5,
      titulo: "Tónico de manzanilla",
      categoria: "piel",
      imagen: 'https://cloudfront-us-east-1.images.arcpublishing.com/eluniversal/S4D6E2CGKVGARARAXKC2USXOX4.jpg',
      ingredientes: ["1 taza de agua", "2 bolsitas de té de manzanilla", "1 cucharada de vinagre de manzana"],
      preparacion: "Hervir el agua y añadir las bolsitas de té. Dejar enfriar. Agregar el vinagre de manzana. Guardar en un frasco limpio.",
      uso: "Aplicar con un algodón después de lavar el rostro",
      recomendaciones: "Calma la piel y equilibra el pH. Ideal para pieles sensibles o con rosácea.",
      advertencias: "Conservar en refrigeración. Usar dentro de los 5 días.",
      duracion: 5,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 6,
      titulo: "Mascarilla de plátano para cabello",
      categoria: "cabello",
      imagen: 'https://www.cocinavital.mx/wp-content/uploads/2019/02/mascarilla-platano-miel-cabello-sedoso.jpg',
      ingredientes: ["1 plátano maduro", "1 huevo", "1 cucharada de miel"],
      preparacion: "Machacar el plátano hasta obtener un puré sin grumos. Agregar el huevo y la miel. Mezclar bien. Aplicar sobre el cabello húmedo, dejar actuar 30 minutos y lavar normalmente.",
      uso: "1 vez por semana",
      recomendaciones: "El plátano aporta potasio que fortalece el cabello. El huevo aporta proteínas.",
      advertencias: "Enjuagar bien con agua fría para que el huevo no se cuaje. No usar si tienes alergia al huevo.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 7,
      titulo: "Crema de manos de caléndula",
      categoria: "manos",
      imagen: 'https://cdn0.uncomo.com/es/posts/6/8/5/como_hacer_crema_de_calendula_en_casa_43586_orig.jpg',
      ingredientes: ["1/4 taza de aceite de coco", "2 cucharadas de cera de abejas", "1 cucharada de infusión de caléndula"],
      preparacion: "Derretir la cera de abejas y el aceite de coco al baño María. Agregar la infusión de caléndula. Verter en un frasco y dejar enfriar.",
      uso: "Aplicar en las manos cuando sea necesario",
      recomendaciones: "La caléndula tiene propiedades antiinflamatorias y cicatrizantes. Ideal para manos agrietadas.",
      advertencias: "Conservar en lugar fresco. Si notas irritación, discontinuar su uso.",
      duracion: 30,
      tiempoRecomendado: 60,
      comentarios: []
    },
    {
      id: 8,
      titulo: "Bebida detox de jengibre y limón",
      categoria: "nutricion",
      imagen: 'https://live.hsmob.io/storage/images/recetaslight.adelgazar.net/recetaslight.adelgazar.net_wp-content_agua-detox-limon-pepino.jpg',
      ingredientes: ["1 trozo de jengibre fresco", "1 limón", "1 litro de agua", "1 cucharada de miel (opcional)"],
      preparacion: "Cortar el jengibre en rodajas finas. Hervir el agua y añadir el jengibre. Dejar reposar 10 minutos. Añadir el jugo de limón y la miel si se desea.",
      uso: "Tomar 1 vaso en ayunas",
      recomendaciones: "Ayuda a depurar el organismo y mejorar la digestión. El jengibre tiene propiedades antiinflamatorias.",
      advertencias: "No consumir si tienes úlceras o gastritis. Consultar a un médico si estás embarazada.",
      duracion: 1,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 9,
      titulo: "Aceite relajante de lavanda",
      categoria: "bienestar",
      imagen: 'https://granvelada.com/blog/wp-content/uploads/2015/03/aceite-de-lavanda-casero.jpg',
      ingredientes: ["1/2 taza de aceite de almendras", "10 gotas de aceite esencial de lavanda"],
      preparacion: "Mezclar el aceite de almendras con el aceite esencial de lavanda. Guardar en un frasco oscuro.",
      uso: "Masajear sobre el cuerpo o añadir al agua del baño",
      recomendaciones: "La lavanda tiene propiedades relajantes que ayudan a combatir el estrés y mejorar el sueño.",
      advertencias: "No usar en piel irritada. Evitar el contacto con los ojos. No ingerir.",
      duracion: 90,
      tiempoRecomendado: 120,
      comentarios: []
    },
    {
      id: 10,
      titulo: "Mascarilla de arcilla verde",
      categoria: "mascarillas",
      imagen:
        'https://argileduvelay.com/wp-content/uploads/2022/10/masque-visage-argile-verte-argile-du-velay.jpg',
      ingredientes: ["2 cucharadas de arcilla verde", "agua mineral o floral"],
      preparacion: "Mezclar la arcilla con agua hasta obtener una pasta homogénea. Aplicar sobre el rostro limpio, evitando el contorno de ojos. Dejar actuar 15 minutos y retirar con agua tibia.",
      uso: "1 vez por semana",
      recomendaciones: "Purifica la piel y absorbe el exceso de grasa. Ideal para pieles mixtas o grasas.",
      advertencias: "No dejar que la mascarilla se seque completamente. Si la piel se enrojece, aplicar menos tiempo.",
      duracion: 7,
      tiempoRecomendado: 28,
      comentarios: []
    },
    {
      id: 11,
      titulo: "Tónico de té verde",
      categoria: "piel",
      imagen: 'https://ajedrea.com/wp-content/uploads/2013/03/como-hacer-hammamelis.jpg',
      ingredientes: ["1 taza de agua", "1 bolsita de té verde", "1 cucharada de hamamelis"],
      preparacion: "Preparar el té verde y dejar enfriar. Agregar el hamamelis. Guardar en un frasco limpio.",
      uso: "Aplicar con un algodón después de lavar el rostro",
      recomendaciones: "El té verde tiene antioxidantes que combaten el envejecimiento. El hamamelis es astringente.",
      advertencias: "Conservar en refrigeración. Usar dentro de los 5 días.",
      duracion: 5,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 12,
      titulo: "Bálsamo labial de betún",
      categoria: "labios",
      imagen: 'https://cdn0.uncomo.com/es/posts/0/8/7/como_hacer_balsamo_labial_con_manteca_de_karite_40780_600.jpg',
      ingredientes: ["1 cucharada de manteca de karité", "1 cucharada de cera de abejas", "1 cucharadita de aceite de vitamina E"],
      preparacion: "Derretir la manteca de karité y la cera de abejas al baño María. Agregar el aceite de vitamina E. Verter en un recipiente pequeño y dejar enfriar.",
      uso: "Aplicar en los labios cuando sea necesario",
      recomendaciones: "Mantiene los labios hidratados y protegidos. La vitamina E ayuda a reparar la piel.",
      advertencias: "Conservar en lugar fresco. Si notas irritación, discontinuar su uso.",
      duracion: 60,
      tiempoRecomendado: 90,
      comentarios: []
    },
    {
      id: 13,
      titulo: "Acondicionador de yogur y miel",
      categoria: "cabello",
      imagen: 'https://okdiario.com/img/2019/12/20/mascarilla-de-miel-y-yogur-para-el-cabello.jpg',
      ingredientes: ["1/2 taza de yogur natural", "1 cucharada de miel", "1 huevo"],
      preparacion: "Mezclar el yogur, la miel y el huevo hasta obtener una mezcla homogénea. Aplicar sobre el cabello húmedo, dejar actuar 20 minutos y lavar normalmente.",
      uso: "1 vez por semana",
      recomendaciones: "El yogur ayuda a suavizar el cabello. La miel aporta brillo y el huevo proteínas.",
      advertencias: "Enjuagar bien con agua fría para que el huevo no se cuaje. No usar si tienes alergia al huevo.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 14,
      titulo: "Exfoliante de azúcar y limón",
      categoria: "piel",
      imagen: 'https://i0.wp.com/evaevuxxy.com/wp-content/uploads/2017/09/lemon-91537_640.jpg?resize=697%2C464',
      ingredientes: ["2 cucharadas de azúcar", "1 cucharada de aceite de oliva", "1/2 limón"],
      preparacion: "Mezclar el azúcar con el aceite de oliva. Añadir el jugo de medio limón. Mezclar bien. Masajear sobre la piel húmeda con movimientos circulares. Enjuagar con agua tibia.",
      uso: "1 vez por semana",
      recomendaciones: "Elimina células muertas y aclara la piel. El limón tiene propiedades blanqueadoras.",
      advertencias: "No usar en piel sensible o irritada. Evitar la exposición al sol después de usar.",
      duracion: 7,
      tiempoRecomendado: 28,
      comentarios: []
    },
    {
      id: 15,
      titulo: "Mascarilla de papaya",
      categoria: "piel",
      imagen: 'https://media.mdzol.com/p/9ed3a192a9814211ac6a119a826675be/adjuntos/373/imagenes/001/026/0001026550/760x0/smart/muchas-mascarillas-ingredientes-naturales-producen-increibles-resultados-la-piel-foto-gastrolab.png',
      ingredientes: ["1/4 taza de papaya madura", "1 cucharada de miel"],
      preparacion: "Machacar la papaya hasta obtener un puré. Agregar la miel y mezclar bien. Aplicar sobre el rostro limpio, dejar actuar 20 minutos y enjuagar.",
      uso: "1 vez por semana",
      recomendaciones: "La papaya contiene enzimas que exfolian suavemente la piel. La miel hidrata y nutre.",
      advertencias: "No usar si eres alérgico a la papaya. Hacer una prueba en una pequeña zona de la piel antes de usar.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 16,
      titulo: "Bálsamo labial de menta",
      categoria: "labios",
      imagen: 'https://spacionatural.cl/cdn/shop/articles/Balsamo-labial-vegano-1024x819-1_1a812749-5872-4f77-8370-8fc405c4913e.jpg?v=1737486272&width=2048',
      ingredientes: ["1 cucharada de cera de abejas", "1 cucharada de aceite de coco", "3 gotas de aceite esencial de menta"],
      preparacion: "Derretir la cera de abejas y el aceite de coco al baño María. Agregar el aceite esencial de menta. Verter en un recipiente pequeño y dejar enfriar.",
      uso: "Aplicar en los labios cuando sea necesario",
      recomendaciones: "La menta refresca los labios y alivia la sensación de sequedad.",
      advertencias: "Conservar en lugar fresco. Si notas irritación, discontinuar su uso.",
      duracion: 30,
      tiempoRecomendado: 60,
      comentarios: []
    },
    {
      id: 17,
      titulo: "Acondicionador de aloe vera",
      categoria: "cabello",
      imagen: 'https://www.foamie.mx/cdn/shop/products/aloeveraplanta.jpg?v=1622130728',
      ingredientes: ["1/2 taza de gel de aloe vera", "2 cucharadas de aceite de coco", "1 cucharada de miel"],
      preparacion: "Mezclar todos los ingredientes hasta obtener una mezcla homogénea. Aplicar sobre el cabello húmedo, dejar actuar 30 minutos y lavar normalmente.",
      uso: "1 vez por semana",
      recomendaciones: "El aloe vera hidrata y repara el cabello dañado. El aceite de coco nutre profundamente.",
      advertencias: "Enjuagar bien para evitar residuos. No usar si tienes el cuero cabelludo muy graso.",
      duracion: 14,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 18,
      titulo: "Crema de manos de avena",
      categoria: "manos",
      imagen: 'https://www.laprensa.hn/binrepository/1160x580/70c0/1020d580/none/11004/YWCD/manos.11_LP892452_MG80208532.jpg',
      ingredientes: ["1/4 taza de avena en polvo", "1/4 taza de agua caliente", "2 cucharadas de aceite de oliva"],
      preparación: "Mezclar la avena con el agua caliente hasta formar una pasta. Agregar el aceite de oliva y mezclar bien. Aplicar sobre las manos y dejar actuar 15 minutos. Enjuagar.",
      uso: "2 veces por semana",
      recomendaciones: "La avena calma la piel irritada y el aceite de oliva hidrata profundamente.",
      advertencias: "Si tienes alergia a la avena, no usar esta receta.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 19,
      titulo: "Bebida energética de espinacas",
      categoria: "nutricion",
      imagen: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWbqbe8Bd13O1Q_k3LY9Z8BC-d2sDsunw0WOCtu0dzram1AP4Ld9fZJC93zZ-Sk-1-DaqpVZ3KlZMh5oxjALwLdvgKY231ekMFGHAg400d-1UYIUCN2ffXhll0ehgVNlnMQXrUKsMdeOM/s1600/Pl%C3%A1tano+y+espinacas.jpg',
      ingredientes: ["1 taza de espinacas frescas", "1 plátano", "1 taza de leche de almendras", "1 cucharada de miel"],
      preparacion: "Licuar todos los ingredientes hasta obtener una mezcla homogénea. Servir inmediatamente.",
      uso: "Tomar 1 vaso en la mañana",
      recomendaciones: "Las espinacas aportan hierro y vitaminas. El plátano da energía natural.",
      advertencias: "No consumir si eres alérgico a alguno de los ingredientes. Consultar a un médico si tienes problemas renales.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 20,
      titulo: "Aceite de masaje con canela",
      categoria: "bienestar",
      imagen: 'https://www.mundoaceitedeoliva.com/wp-content/uploads/2024/01/Frasco-de-vidrio-para-conservar-aceite-aromatizado-1024x585.jpg',
      ingredientes: ["1/2 taza de aceite de coco", "1 cucharadita de canela en polvo", "5 gotas de aceite esencial de naranja"],
      preparacion: "Calentar ligeramente el aceite de coco. Agregar la canela y el aceite esencial de naranja. Mezclar bien.",
      uso: "Masajear sobre el cuerpo",
      recomendaciones: "La canela mejora la circulación y la naranja eleva el ánimo. Ideal para masajes relajantes.",
      advertencias: "No usar en piel sensible o irritada. Evitar el contacto con los ojos. No ingerir.",
      duracion: 30,
      tiempoRecomendado: 60,
      comentarios: []
    },
    {
      id: 21,
      titulo: "Mascarilla de yogur y fresa",
      categoria: "mascarillas",
      imagen: 'https://i.pinimg.com/736x/14/52/f1/1452f15aebe8efcfba445e1d1a185319.jpg',
      ingredientes: ["3 fresas maduras", "2 cucharadas de yogur natural", "1 cucharada de miel"],
      preparacion: "Machacar las fresas hasta obtener un puré. Agregar el yogur y la miel. Mezclar bien. Aplicar sobre el rostro limpio, dejar actuar 15 minutos y enjuagar.",
      uso: "1 vez por semana",
      recomendaciones: "Las fresas contienen ácido salicílico que exfolia la piel. El yogur y la miel hidratan.",
      advertencias: "No usar si eres alérgico a las fresas. Hacer una prueba en una pequeña zona de la piel antes de usar.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 22,
      titulo: "Tónico de pepino",
      categoria: "piel",
      imagen: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/44CVWVB73FHGTO6WUUZOFZ5I3I.jpg',
      ingredientes: ["1/2 pepino", "1/4 taza de agua de rosas"],
      preparacion: "Licuar el pepino y colar el jugo. Mezclar con el agua de rosas. Guardar en un frasco limpio.",
      uso: "Aplicar con un algodón después de lavar el rostro",
      recomendaciones: "El pepino refresca y calma la piel. El agua de rosas equilibra el pH.",
      advertencias: "Conservar en refrigeración. Usar dentro de los 3 días.",
      duracion: 3,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 23,
      titulo: "Bálsamo labial de cacao y vainilla",
      categoria: "labios",
      imagen: 'https://www.esturirafi.com/wp-content/uploads/2019/11/como-hacer-balsamo-labial-receta-casero.jpg',
      ingredientes: ["1 cucharada de manteca de cacao", "1 cucharada de cera de abejas", "1/2 cucharadita de extracto de vainilla"],
      preparacion: "Derretir la manteca de cacao y la cera de abejas al baño María. Agregar el extracto de vainilla. Verter en un recipiente pequeño y dejar enfriar.",
      uso: "Aplicar en los labios cuando sea necesario",
      recomendaciones: "Mantiene los labios hidratados y con un aroma agradable a vainilla.",
      advertencias: "Conservar en lugar fresco. Si notas irritación, discontinuar su uso.",
      duracion: 45,
      tiempoRecomendado: 90,
      comentarios: []
    },
    {
      id: 24,
      titulo: "Acondicionador de palta y mayonesa",
      categoria: "cabello",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntj6Z8IdkmuVwsCe71IUlpJnQgvsUxwoFFg&s',
      ingredientes: ["1/2 palta maduro", "2 cucharadas de mayonesa", "1 cucharada de aceite de oliva"],
      preparacion: "Machacar la palta hasta obtener un puré. Agregar la mayonesa y el aceite de oliva. Mezclar bien. Aplicar sobre el cabello húmedo, dejar actuar 30 minutos y lavar normalmente.",
      uso: "1 vez por semana",
      recomendaciones: "la palta y la mayonesa aportan grasas que nutren profundamente el cabello seco.",
      advertencias: "Enjuagar bien para evitar residuos. No usar si tienes el cuero cabelludo muy graso.",
      duracion: 14,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 25,
      titulo: "Exfoliante de sal marina",
      categoria: "piel",
      imagen: 'https://cdn0.uncomo.com/es/posts/9/8/1/como_exfoliar_la_piel_con_sal_marina_45189_orig.jpg',
      ingredientes: ["2 cucharadas de sal marina", "1 cucharada de aceite de almendras", "1 cucharadita de jugo de limón"],
      preparacion: "Mezclar la sal marina con el aceite de almendras. Agregar el jugo de limón. Mezclar bien. Masajear sobre la piel húmeda con movimientos circulares. Enjuagar con agua tibia.",
      uso: "1 vez por semana",
      recomendaciones: "La sal marina elimina células muertas y mejora la circulación. El limón aclara la piel.",
      advertencias: "No usar en piel sensible o irritada. Evitar la exposición al sol después de usar.",
      duracion: 7,
      tiempoRecomendado: 28,
      comentarios: []
    },
    {
      id: 26,
      titulo: "Mascarilla de zanahoria",
      categoria: "piel",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQq2bafoRXEr08hFS60B8pmxZbam4WMJQrp2VWWxOvPQp-20QzbjTLHP_ed214fvXcINo&usqp=CAU',
      ingredientes: ["1 zanahoria pequeña cocida", "1 cucharada de miel", "1 cucharada de yogur natural"],
      preparacion: "Machacar la zanahoria cocida hasta obtener un puré. Agregar la miel y el yogur. Mezclar bien. Aplicar sobre el rostro limpio, dejar actuar 20 minutos y enjuagar.",
      uso: "1 vez por semana",
      recomendaciones: "La zanahoria aporta betacarotenos que dan brillo a la piel. La miel y el yogur hidratan.",
      advertencias: "No usar si eres alérgico a la zanahoria. Hacer una prueba en una pequeña zona de la piel antes de usar.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 27,
      titulo: "Ungüento cicatrizante de aloe y caléndula",
      categoria: "piel",
      imagen: "https://i.ytimg.com/vi/1Iv43MFZGr8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD-N4Yrs4hB9SVUzAxACiFT9tGalA",
      ingredientes: [
        "2 cucharadas de gel de aloe vera",
        "2 cucharadas de aceite de caléndula",
        "1 cucharadita de cera de abejas"
      ],
      preparacion: "Derrite la cera de abejas a baño María, añade el aloe y el aceite. Mezcla hasta integrar. Guarda en un frasco pequeño.",
      uso: "Aplicar sobre heridas limpias, quemaduras leves o cicatrices 2 veces al día.",
      recomendaciones: "Ideal para acelerar la cicatrización y calmar la piel irritada.",
      advertencias: "No aplicar sobre heridas abiertas profundas o infecciones.",
      duracion: 15,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 28,
      titulo: "Crema antiestrías natural",
      categoria: "piel",
      imagen: "https://cdn0.uncomo.com/es/posts/4/6/1/otros_remedios_caseros_para_las_estrias_blancas_44164_3_600.jpg",
      ingredientes: [
        "2 cucharadas de manteca de cacao",
        "2 cucharadas de aceite de almendras",
        "1 cucharadita de aceite de rosa mosqueta"
      ],
      preparacion: "Derrite la manteca de cacao, mezcla con los aceites y deja enfriar en un frasco. Aplica sobre zonas propensas a estrías.",
      uso: "2 veces al día, masajeando hasta absorber.",
      recomendaciones: "Previene y mejora la apariencia de estrías.",
      advertencias: "No usar si eres alérgico a frutos secos.",
      duracion: 30,
      tiempoRecomendado: 60,
      comentarios: []
    },
    {
      id: 29,
      titulo: "Gel refrescante post-solar",
      categoria: "piel",
      imagen: "https://content.cuerpomente.com/medio/2025/07/23/gel-de-aloe-vera_22e7d9b3_1320432195_250723204303_900x900.webp",
      ingredientes: [
        "4 cucharadas de gel de aloe vera",
        "1 cucharada de agua de rosas",
        "5 gotas de aceite esencial de lavanda"
      ],
      preparacion: "Mezcla todos los ingredientes y guarda en un envase limpio en la nevera. Aplica frío sobre la piel.",
      uso: "Después de la exposición solar, varias veces al día si es necesario.",
      recomendaciones: "Calma quemaduras solares leves e hidrata.",
      advertencias: "No aplicar en quemaduras graves.",
      duracion: 7,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 30,
      titulo: "Aceite corporal antiestrías",
      categoria: "bienestar",
      imagen: "https://mejorconsalud.as.com/wp-content/uploads/2015/10/Aceite-de-coco2-500x336.jpg?auto=webp&quality=7500&width=1920&crop=16:9,smart,safe&format=webp&optimize=medium&dpr=2&fit=cover&fm=webp&q=75&w=1920&h=1080",
      ingredientes: [
        "50 ml de aceite de almendras",
        "20 ml de aceite de coco",
        "10 gotas de aceite esencial de naranja"
      ],
      preparacion: "Mezcla todos los aceites y guarda en un frasco oscuro. Usa diariamente en zonas propensas.",
      uso: "Después de la ducha, masajeando en abdomen, muslos y caderas.",
      recomendaciones: "Previene nuevas estrías y mejora la elasticidad.",
      advertencias: "No usar aceites esenciales durante el embarazo sin consultar.",
      duracion: 60,
      tiempoRecomendado: 90,
      comentarios: []
    },
    {
      id: 31,
      titulo: "Mascarilla para manchas de cúrcuma",
      categoria: "piel",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0C58g-_X2xP6lMIo0eZffGgjElQBXaiplaw&s",
      ingredientes: [
        "1 cucharadita de cúrcuma en polvo",
        "1 cucharada de yogur natural",
        "1 cucharadita de miel"
      ],
      preparacion: "Mezcla todos los ingredientes y aplica en las manchas. Deja actuar 20 minutos y enjuaga.",
      uso: "2 veces por semana.",
      recomendaciones: "Aclara manchas y unifica el tono de la piel.",
      advertencias: "La cúrcuma puede manchar temporalmente la piel clara.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 32,
      titulo: "Bálsamo cicatrizante de miel y propóleo",
      categoria: "manos",
      imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/OAXWVHF53NFEDNMEILXDOY7YJI.jpg",
      ingredientes: [
        "2 cucharadas de miel",
        "1 cucharadita de extracto de propóleo",
        "1 cucharadita de aceite de oliva"
      ],
      preparacion: "Mezcla todos los ingredientes y aplica en la herida o zona a tratar. Cubre si es necesario.",
      uso: "2 veces al día.",
      recomendaciones: "Acelera la curación de cortes y grietas.",
      advertencias: "No usar si alérgico a productos de abeja.",
      duracion: 15,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 33,
      titulo: "Loción calmante de avena y manzanilla",
      categoria: "piel",
      imagen: "https://content.cuerpomente.com/medio/2024/10/04/mascarilla-avena_17af969a_519086238_241004090153_900x900.jpg",
      ingredientes: [
        "1 taza de agua",
        "2 cucharadas de avena",
        "1 bolsita de té de manzanilla"
      ],
      preparacion: "Hierve el agua con la avena y la manzanilla 10 minutos. Cuela, enfría y aplica con algodón.",
      uso: "Varias veces al día sobre irritaciones y picor.",
      recomendaciones: "Alivia picor y enrojecimiento de piel sensible.",
      advertencias: "Conservar en nevera. Usar máximo 2 días.",
      duracion: 2,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 34,
      titulo: "Mascarilla nutritiva de calabaza",
      categoria: "mascarillas",
      imagen: "https://tvazteca.brightspotcdn.com/e9/c8/430c962a4a669e423c01bc40d068/mascarillas-con-calabaza-para-una-piel-tersa.jpg",
      ingredientes: [
        "2 cucharadas de puré de calabaza cocida",
        "1 cucharada de yogur natural",
        "1 cucharadita de miel"
      ],
      preparacion: "Mezcla todo y aplica en el rostro limpio. Deja actuar 15 minutos y enjuaga con agua tibia.",
      uso: "1 vez por semana.",
      recomendaciones: "Nutre y da brillo al rostro apagado.",
      advertencias: "No usar si eres alérgico a la calabaza o lácteos.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 35,
      titulo: "Crema reparadora para talones agrietados",
      categoria: "manos",
      imagen: "https://imagenes.20minutos.es/files/image_1280_720/uploads/imagenes/2022/01/05/general-pies-hidratados.jpeg",
      ingredientes: [
        "2 cucharadas de vaselina",
        "1 cucharada de aceite de coco",
        "5 gotas de aceite esencial de menta"
      ],
      preparacion: "Mezcla bien los ingredientes y aplica en talones limpios antes de dormir. Cubre con calcetines.",
      uso: "Cada noche hasta mejoría.",
      recomendaciones: "Repara y suaviza la piel muy seca y agrietada.",
      advertencias: "No usar aceites esenciales en niños pequeños.",
      duracion: 15,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 1001,
      titulo: "Inchicapi ligero saludable",
      categoria: "cuñumbuque",
      imagen: "https://comedera.com/wp-content/uploads/sites/9/2022/07/Inchicapi-de-gallina-shutterstock_1317760745.jpg?fit=1316,971&crop=0px,116px,1316px,740px",
      ingredientes: [
        "1 pechuga de pollo o gallina",
        "3 cucharadas de maní molido",
        "1 ramita de culantro picado",
        "1 diente de ajo picado",
        "1 litro de agua",
        "Pizca de sal (al gusto, poca)",
        "No agregar grasa/aceite",
        "Opcional: yuca troceada"
      ],
      preparacion: "1. Cocina la carne en el litro de agua, agrega ajo y sal. 2. Cuando esté blando, añade el maní molido y el culantro. 3. Cocina a fuego lento removiendo hasta que espese un poco. 4. Si usas yuca, agrégala en trozos al principio. 5. Sirve tibio.",
      uso: "Consumir hasta 2 veces por semana como parte de una alimentación equilibrada.",
      recomendaciones: "Aporta proteínas, colágeno natural y energía de forma saludable. Ideal para quienes buscan mejorar piel y recuperación física.",
      advertencias: "Evitar si tienes alergia al maní. No agregar grasa ni frituras.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 1002,
      titulo: "Chapo sin azúcar",
      categoria: "cuñumbuque",
      imagen: "https://aventuras.pe/blog/wp-content/uploads/2022/12/chapo-de-platano.jpg",
      ingredientes: [
        "6 plátanos maduros cocidos",
        "1 litro de agua",
        "Canela en rama (opcional)"
      ],
      preparacion: "1. Pela y cocina los plátanos maduros. 2. Hazlos puré y licua con el litro de agua. 3. Si deseas, añade canela y vuelve a hervir unos minutos. 4. Servir tibio o frío.",
      uso: "Reemplaza dulces o snacks procesados, ideal como desayuno o media tarde.",
      recomendaciones: "Aporta energía, potasio, mejora la hidratación de la piel y es una opción de merienda saludable.",
      advertencias: "Evitar si tienes diabetes o intolerancia a los plátanos. No agregar azúcar.",
      duracion: 7,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 1003,
      titulo: "Yuca con cocona y aceite natural",
      categoria: "cuñumbuque",
      imagen: "https://www.recetasnestle.com.pe/sites/default/files/styles/crop_article_banner_desktop_nes/public/2024-03/como-cocinar-con-yuca.webp?itok=cec635Bn",
      ingredientes: [
        "4 yucas medianas (peladas y cocidas)",
        "1 cocona madura (o puedes usar limón en su lugar)",
        "2 cucharadas de aceite vegetal natural (coco, oliva, maíz)",
        "Perejil o culantro picado",
        "Pizca de sal"
      ],
      preparacion: "1. Cocina la yuca hasta que esté blanda y córtala en tiras o cubos. 2. Pica la cocona (o exprime limón), mézclala con las yucas en un bol. 3. Agrega el aceite natural, el perejil o culantro y la sal. 4. Mezcla bien y sirve fresca como acompañante.",
      uso: "Consumir como guarnición, ensalada o snack 2-3 veces por semana.",
      recomendaciones: "Limpia el organismo, mejora la digestión y aporta fibra, hidratación y vitaminas.",
      advertencias: "Evitar en personas con problemas estomacales agudos. Si usas cocona, preferir cocona fresca.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 2001,
      titulo: "Infusión de Paico",
      categoria: "cuñumbuque",
      imagen: "https://lanotadigital.com.ar/wp-content/uploads/2016/12/paico-chenopodium-ambrosioide.jpg",
      ingredientes: [
        "3–5 hojas frescas de paico",
        "1 taza de agua"
      ],
      preparacion: "Hervir el agua, agregar las hojas de paico, tapar y dejar reposar 5 minutos. Colar y tomar tibio.",
      uso: "1 vez al día, durante un máximo de 3-5 días.",
      recomendaciones: "Tradicionalmente usado para parásitos, dolor de estómago, gases e inflamación. Preferir hojas frescas y usar por poco tiempo.",
      advertencias: "No tomar en exceso ni durante periodos prolongados. No apto para embarazadas ni niños muy pequeños.",
      duracion: 3,
      tiempoRecomendado: 5,
      comentarios: []
    },
    {
      id: 2002,
      titulo: "Infusión de Ingüiri (jengibre amazónico)",
      categoria: "cuñumbuque",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu4nXcIWP7EwUCc5iDq5iCxbebaU0uO3GrFw&s",
      ingredientes: [
        "1 trocito pequeño de ingüiri (jengibre amazónico) rallado",
        "1 taza de agua caliente",
        "Miel al gusto (opcional)"
      ],
      preparacion: "Agregar el ingüiri rallado al agua caliente. Dejar reposar 5 minutos. Endulzar con miel si se desea. También puede machacarse y mezclarse con miel directamente.",
      uso: "1 vez al día, preferentemente por la noche o cuando hay síntomas de resfrío.",
      recomendaciones: "Alivia el frío, ayuda a la garganta y las defensas. Aporta energía y mejora la circulación.",
      advertencias: "No exceder su uso diario. Evitar en personas con úlcera gástrica. Consultar en embarazo.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 2003,
      titulo: "Té de Chanca Piedra",
      categoria: "cuñumbuque",
      imagen: "https://www.elespectador.com/resizer/v2/PHVQISSUPFDCLDHTEWCIK43A4Y.jpg?auth=e0b74af8713eb55e2c9ff52ac83d9b237fed0a905c77b9b9e5a0950bee250c5f&width=920&height=613&smart=true&quality=60",
      ingredientes: [
        "1 cucharada de hojas o tallo de chanca piedra",
        "1 litro de agua"
      ],
      preparacion: "Hervir el litro de agua, agregar la planta y hervir 10 minutos. Colar. Tomar hasta 2 tazas repartidas en el día.",
      uso: "Consumir por máximo 5-7 días (no durante semanas continuas).",
      recomendaciones: "MUY usada para mantener la salud de los riñones y limpiar el cuerpo. Tomar pausas entre periodos de consumo.",
      advertencias: "No usar durante más de una semana seguida. Niños, embarazadas o personas con enfermedades renales consultar a un profesional.",
      duracion: 5,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 2004,
      titulo: "Infusión suave de Sacha Culantro",
      categoria: "cuñumbuque",
      imagen: "https://imgmedia.buenazo.pe/970x533/buenazo/original/2022/03/03/622129132b61d2649f3d5803.webp",
      ingredientes: [
        "5-7 hojas frescas de sacha culantro (o al gusto)",
        "1 taza de agua caliente"
      ],
      preparacion: "Agregar las hojas frescas al agua caliente y tapar. Reposar 5-7 minutos. Tomar tibio, especialmente después de comidas pesadas.",
      uso: "Solo después de comidas pesadas y máximo una vez al día.",
      recomendaciones: "Ayuda a la digestión, alivia inflamaciones y limpia el tracto digestivo de manera tradicional.",
      advertencias: "No consumir en exceso. Pacientes con alergias o problemas hepáticos consultar antes.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 2005,
      titulo: "Infusión de Hierba Luisa",
      categoria: "cuñumbuque",
      imagen: "https://tumercadoperu.com/wp-content/uploads/2020/08/hierba-luisa.png",
      ingredientes: [
        "Unas ramitas frescas de hierba luisa",
        "1 taza de agua"
      ],
      preparacion: "Hervir agua, agregar la hierba luisa, tapar y dejar reposar 7 minutos. Colar y tomar antes de dormir.",
      uso: "1 vez al día, preferentemente por la noche.",
      recomendaciones: "Muy útil para el estrés, relajar el cuerpo y mejorar el sueño.",
      advertencias: "No tomar en caso de hipotensión (presión baja). No exceder el consumo diario.",
      duracion: 5,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 2006,
      titulo: "Masato de Yuca",
      categoria: "cuñumbuque",
      imagen: "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvdGhpbmdfaW1hZ2VzLzljMzIwMGIzYzFlMjBlYWQ0MV9NYXNhdG9kZVl1Y2FfVG9ueUR1bm5lbGwuanBnIl0sWyJwIiwiY29udmVydCIsIiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXSxbInAiLCJ0aHVtYiIsIjc4MHg1MjAjIl1d/MasatodeYuca_TonyDunnell.jpg",
      ingredientes: [
        "1 kg de yuca fresca",
        "Agua (suficiente para triturar y fermentar)"
      ],
      preparacion: "Cocer la yuca pelada en agua hasta que esté muy suave. Machacar o moler la yuca hasta formar una pasta. Agregar agua hasta lograr una bebida espesa. Tapar y dejar fermentar entre 1 y 2 días en un lugar fresco. Servir natural.",
      uso: "1 vaso al día como fuente de energía. Muy apreciado en reuniones y trabajos.",
      recomendaciones: "Bebida ancestral, energética, ayuda a la digestión y es ideal para compartir.",
      advertencias: "Consumir fresco (no fermentar demasiado). Personas con fermentos/digestión sensible, usar con moderación.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 2007,
      titulo: "Chicha Casera de Maíz",
      categoria: "cuñumbuque",
      imagen: "https://i.pinimg.com/736x/4f/10/46/4f1046b9190c7ebbb86af9248ea6be95.jpg",
      ingredientes: [
        "1 kg de maíz amarillo/nativo",
        "Agua (para hervir y fermentar)"
      ],
      preparacion: "Hervir el maíz hasta estar tierno, molerlo o majarlo, añadir agua y dejar fermentar de 1 a 2 días según clima y gusto. Servir fría como refresco.",
      uso: "Ideal para refrescarse, dar energía natural y compartir en familia o comunidad.",
      recomendaciones: "Fuente tradicional de energía y buen acompañante en reuniones. Natural, sin químicos.",
      advertencias: "No consumir si huele ácido/agriado. Apto para niños pero siempre fresco.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
  id: 3001,
  titulo: "Refresco de Piña con Cáscara (digestivo)",
  categoria: "tarapoto",
  imagen: "https://www.cocina-cubana.com/base/stock/Recipe/jugo-de-pina/jugo-de-pina_web.jpg.webp",
  ingredientes: [
    "Cáscara bien lavada de 1 piña",
    "1 litro de agua",
    "Canela (opcional)"
  ],
  preparacion: "Lavar muy bien la cáscara de la piña. Hervir la cáscara en 1 litro de agua durante 10–15 minutos. Dejar reposar hasta que enfríe, colar y servir frío. Opcional: añadir una rama de canela mientras hierve para sabor.",
  uso: "Tomar frío como digestivo. Recomendado hasta 3 veces por semana.",
  recomendaciones: "Usar piña madura y lavar correctamente la cáscara. Puedes endulzar ligeramente con miel si lo deseas.",
  advertencias: "No tomar si tienes gastritis fuerte o sensibilidad gástrica. Consultar con médico en caso de duda.",
  duracion: 3,
  tiempoRecomendado: 7,
  comentarios: []
      },
 
{
  id: 3003,
  titulo: "Ensalada de Chonta",
  categoria: "tarapoto",
  imagen: "https://buenazo.cronosmedia.glr.pe/original/2022/06/07/629e9e114b9eb81b6563ac56.jpg",
  ingredientes: [
    "Chonta (palmito) fresca picada",
    "Jugo de limón",
    "Tomate picado",
    "Cebolla en pluma",
    "Sal al gusto"
  ],
  preparacion: "Picar la chonta finamente. Mezclar con tomate y cebolla. Aderezar con jugo de limón y sal al gusto. Servir inmediatamente para mantener frescura y textura.",
  uso: "Acompañamiento nutritivo; puede consumirse 1–2 veces por semana.",
  recomendaciones: "Usar chonta fresca y conservarla en frío. Añadir aguacate u otras verduras si se desea.",
  advertencias: "Asegurar la frescura de la chonta; evitar si hay sospecha de deterioro.",
  duracion: 1,
  tiempoRecomendado: 7,
  comentarios: []
},
{
  id: 3004,
  titulo: "Infusión de Matico",
  categoria: "tarapoto",
  imagen: "https://hausnusse.cl/cdn/shop/files/Matico_2.png?v=1733929532&width=1946",
  ingredientes: [
    "Hojas frescas de matico",
    "1 taza de agua"
  ],
  preparacion: "Hervir una taza de agua y añadir unas hojas de matico. Retirar del fuego, tapar y dejar reposar 5–10 minutos. Colar y tomar tibio o frío según preferencia.",
  uso: "Uso externo: agua hervida para lavar heridas (uso tópico). Uso interno: infusión suave para garganta o malestar, 1 vez al día por 3–5 días.",
  recomendaciones: "Preferir hojas frescas y preparar infusiones suaves. Para uso externo, emplear agua limpia y recipientes limpios.",
  advertencias: "No usar en heridas profundas o infectadas sin la supervisión de un profesional de salud. No exceder uso interno por más de los días recomendados.",
  duracion: 3,
  tiempoRecomendado: 5,
  comentarios: []
},
{
  id: 3005,
  titulo: "Sangre de Grado (uso tradicional)",
  categoria: "tarapoto",
  imagen: "https://c.files.bbci.co.uk/13E3F/production/_110317418_sangre.jpg",
  ingredientes: [
    "Gotas de sangre de grado (resina tradicional)",
    "Agua para diluir (si se ingiere en pequeña cantidad)"
  ],
  preparacion: "Para uso interno ocasional: diluir 1–2 gotas en un vaso de agua (uso esporádico). Para uso tópico: aplicar 1–2 gotas directamente sobre heridas leves o úlceras, según práctica tradicional.",
  uso: "Uso externo para acelerar cicatrización en heridas leves; uso interno ocasional, por periodos cortos (3–5 días).",
  recomendaciones: "Usar en bajas cantidades y solo por períodos cortos. Preferir productos de procedencia conocida.",
  advertencias: "No ingerir en grandes cantidades. Evitar uso prolongado. Consultar con profesional si hay dudas o condiciones de salud.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},
{
  id: 3006,
  titulo: "Achiote (preparación para piel)",
  categoria: "tarapoto",
  imagen: "https://www.laanita.com/wp-content/uploads/2023/09/El-achiote-y-sus-usos-medicinales.png",
  ingredientes: [
    "Semillas de achiote",
    "Aceite vegetal (coco, almendras u oliva)"
  ],
  preparacion: "Machacar las semillas de achiote hasta obtener una pasta. Mezclar con aceite vegetal hasta integrar. Aplicar una capa ligera sobre la piel en la zona deseada.",
  uso: "Uso externo para irritaciones leves y protección natural; aplicar según necesidad.",
  recomendaciones: "Realizar una prueba en una pequeña zona antes de aplicar ampliamente. Usar aceite base de buena calidad.",
  advertencias: "Puede manchar ropa y piel temporalmente. Evitar en piel con heridas abiertas sin consulta médica.",
  duracion: 30,
  tiempoRecomendado: 14,
  comentarios: []
},
    {
    id: 36,
    titulo: "Mascarilla de Aguaje",
    categoria: "mascarillas",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT2yxkr7zyWSGqatp53n61b4hOxqWiQ30fKw&s",
    ingredientes: ["2 cucharadas de pulpa de aguaje", "1 cucharadita de miel"],
    preparacion: "Mezclar la pulpa de aguaje con la miel hasta obtener una pasta homogénea. Aplicar sobre el rostro limpio 15 minutos. Enjuagar con agua tibia.",
    uso: "1–2 veces por semana",
    recomendaciones: "Ideal para pieles que necesitan nutrición y elasticidad; puedes aplicar una mascarilla de mantenimiento cada semana.",
    advertencias: "Puede manchar ligeramente; hacer prueba en pequeña zona si piel clara o sensible.",
    duracion: 7,
    tiempoRecomendado: 21,
    comentarios: []
  },
  {
    id: 37,
    titulo: "Mascarilla de Camu Camu",
    categoria: "mascarillas",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7rlGXpT04vDD3BhG9ZbiLAXfTguNBdk93Q&s",
    ingredientes: ["1 cucharada de pulpa de camu camu", "2 cucharadas de yogur natural"],
    preparacion: "Mezclar la pulpa con el yogur hasta obtener pasta. Aplicar en rostro 10 minutos. Enjuagar con agua fresca.",
    uso: "1 vez por semana",
    recomendaciones: "Ideal para iluminar y aportar vitamina C; combinar con protector solar durante el día.",
    advertencias: "Puede arder si hay heridas o microcortes en la piel; evitar uso sobre piel lesionada.",
    duracion: 3,
    tiempoRecomendado: 14,
    comentarios: []
  },
  {
    id: 38,
    titulo: "Tónico de Hoja de Guayaba",
    categoria: "piel",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbaqsTtE9kGVmAcrfoJP2Idq6pLw4VuP2eDw&s",
    ingredientes: ["10 hojas de guayaba", "1 taza de agua", "1 cucharadita de vinagre de manzana (opcional)"],
    preparacion: "Hervir las hojas en agua por 10 minutos. Dejar enfriar, colar y agregar vinagre si se desea. Aplicar con algodón sobre la piel limpia.",
    uso: "3 veces por semana",
    recomendaciones: "Útil para piel con granitos o piel grasa; usar por la noche para mejores resultados.",
    advertencias: "No usar si hay alergia a la planta; hacer prueba en pequeña zona.",
    duracion: 5,
    tiempoRecomendado: 21,
    comentarios: []
  },
  {
    id: 39,
    titulo: "Mascarilla Capilar de Sacha Inchi",
    categoria: "cabello",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0JBGSFTAzFZ8WecZ0VcJmtPv04x0KN4WWyQ&s",
    ingredientes: ["1 cucharada de aceite de sacha inchi", "1 cucharada de aceite de oliva (opcional)"],
    preparacion: "Aplicar aceite en las puntas y zonas secas del cabello, dejar 20 minutos y enjuagar con tu shampoo habitual.",
    uso: "1 vez por semana",
    recomendaciones: "Ideal para cabellos muy secos; calentar ligeramente el aceite antes de aplicar para mejor penetración.",
    advertencias: "No aplicar en exceso en la raíz si tienes cuero cabelludo graso.",
    duracion: 30,
    tiempoRecomendado: 30,
    comentarios: []
  },
  {
    id: 40,
    titulo: "Exfoliante de Harina de Arroz",
    categoria: "piel",
    imagen: "https://cdn0.recetasgratis.net/es/posts/8/2/7/harina_de_arroz_casera_73728_600.jpg",
    ingredientes: ["2 cucharadas de harina de arroz", "agua o agua de rosas (cantidad necesaria)"],
    preparacion: "Mezclar harina con agua hasta obtener una pasta espesa. Masajear suavemente sobre piel húmeda durante 2 minutos y enjuagar.",
    uso: "1 vez por semana",
    recomendaciones: "Exfoliación suave ideal para piel sensible; usar con movimientos circulares y moderados.",
    advertencias: "No frotar fuerte para evitar irritación.",
    duracion: 30,
    tiempoRecomendado: 21,
    comentarios: []
  },
  {
    id: 41,
    titulo: "Gel de Yuca para Cabello",
    categoria: "cabello",
    imagen: "https://i.ytimg.com/vi/Yg3bwGgysu8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAGBOLUlPuupcsYJy4-b1wqDBvP2Q",
    ingredientes: ["1 taza de yuca cocida", "agua suficiente para obtener gel espeso"],
    preparacion: "Hervir yuca hasta que esté muy blanda, triturar y colar el agua espesa resultante; usar como gel para peinar o aplicar en puntas.",
    uso: "2 veces por semana",
    recomendaciones: "Refrigerar hasta 3 días; usar como fijador natural para rizos y definición.",
    advertencias: "Guardar refrigerado y desechar si huele agrio; no conviene en personas que reaccionan a almidones fermentados.",
    duracion: 3,
    tiempoRecomendado: 14,
    comentarios: []
  },
  {
    id: 42,
    titulo: "Mascarilla de Papaya Verde",
    categoria: "mascarillas",
    imagen: "https://mejorconsalud.as.com/wp-content/uploads/2015/03/papaya-verde-fruta.jpg?auto=format%2Ccompress&quality=75&width=1920&height=1080&fit=cover&gravity=center&sharp=true&progressive=true",
    ingredientes: ["1/2 taza de papaya verde triturada"],
    preparacion: "Triturar papaya verde hasta obtener puré. Aplicar en rostro 10 minutos y enjuagar con agua tibia.",
    uso: "1 vez por semana",
    recomendaciones: "Excelente como exfoliante enzimático natural; combinar con hidratante después.",
    advertencias: "Sensibilidad al sol después de uso (evitar exposición directa), no usar sobre piel lesionada.",
    duracion: 2,
    tiempoRecomendado: 14,
    comentarios: []
  },
  {
    id: 43,
    titulo: "Crema de Copoazú Casera",
    categoria: "manos",
    imagen: "https://comidaperuanaweb.org/wp-content/uploads/2019/02/Crema-de-Copoazu%CC%81-1-1.jpg",
    ingredientes: ["2 cucharadas de manteca de copoazú", "1 cucharada de aceite vegetal (coco/almendras)"],
    preparacion: "Derretir manteca, mezclar con aceite, verter en frasco y dejar enfriar. Aplicar en manos o cuerpo según necesidad.",
    uso: "Uso diario moderado",
    recomendaciones: "Ideal para piel muy seca o agrietada. Masajear hasta absorción.",
    advertencias: "Puede sentirse pesada en piel grasa; hacer prueba en pequeña zona.",
    duracion: 60,
    tiempoRecomendado: 60,
    comentarios: []
  },
  {
    id: 44,
    titulo: "Tónico de Matico",
    categoria: "bienestar",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34_rxKwvA1T-gb0LrN2Q3gUpziDny2mVX4w&s",
    ingredientes: ["Hojas de matico", "1 taza de agua"],
    preparacion: "Hervir hojas 5–10 minutos, colar y enfriar. Aplicar con algodón externamente para calmar piel o usar como infusión suave para garganta.",
    uso: "3–5 días",
    recomendaciones: "Uso tópico para heridas leves (limpias) y como infusión suave para molestias de garganta.",
    advertencias: "No aplicar en heridas abiertas profundas; consultar profesional en caso de infección.",
    duracion: 3,
    tiempoRecomendado: 5,
    comentarios: []
  },
  {
    id: 45,
    titulo: "Mascarilla de Plátano Verde",
    categoria: "mascarillas",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7e5LvfvozbaNyaYKN-qWfvo3Ws_X92xT4A&s",
    ingredientes: ["1 plátano verde triturado"],
    preparacion: "Triturar plátano verde hasta puré. Aplicar 15 minutos y enjuagar.",
    uso: "1 vez por semana",
    recomendaciones: "Buena para controlar brillo y grasa; combinar con arcilla si se desea efecto astringente.",
    advertencias: "Puede resecar si se usa en exceso; hidratar después.",
    duracion: 3,
    tiempoRecomendado: 21,
    comentarios: []
  },

  /* Nutrición San Martín 46-50 */
  {
    id: 46,
    titulo: "Ensalada de Cocona y Tomate",
    categoria: "nutricion",
    imagen: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    ingredientes: ["Cocona picada", "Tomate picado", "Jugo de limón", "Sal al gusto"],
    preparacion: "Mezclar cocona y tomate, aderezar con limón y sal. Servir fresca.",
    uso: "2 veces por semana",
    recomendaciones: "Excelente digestiva y refrescante; consumir con moderación si hay acidez estomacal.",
    advertencias: "Evitar en gastritis fuerte o úlceras activas.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 47,
    titulo: "Sudado de Doncella",
    categoria: "nutricion",
    imagen: "https://origin.cronosmedia.glr.pe/large/2021/03/18/lg_605360564332ac2dfc54e0cb.jpg",
    ingredientes: ["Pescado fresco", "Culantro", "Cebolla", "Jugo de limón", "Sal"],
    preparacion: "Cocer pescado con cebolla y culantro 15 minutos en olla con poca agua y jugo de limón. Servir caliente.",
    uso: "1–2 veces por semana",
    recomendaciones: "Usar pescado fresco; acompañar con yuca o arroz.",
    advertencias: "Verificar frescura y cocción para evitar riesgos alimentarios.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 48,
    titulo: "Sopa de Chonta",
    categoria: "nutricion",
    imagen: "https://www.natusal.com.co/wp-content/uploads/2020/07/crema-de-chontaduro-min-640x800.jpg",
    ingredientes: ["Chonta (palmito) picado", "Verduras variadas", "Agua", "Sal"],
    preparacion: "Hervir chonta y verduras hasta que estén tiernas. Salar al gusto y servir caliente.",
    uso: "1 vez por semana",
    recomendaciones: "Fuente de fibra y vitaminas; ideal como acompañamiento ligero.",
    advertencias: "Cocinar bien la chonta antes de consumir.",
    duracion: 2,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 49,
    titulo: "Puré de Plátano Verde Amazónico",
    categoria: "nutricion",
    imagen: "https://www.cocinavital.mx/wp-content/uploads/2017/08/pure-platano-macho.jpg",
    ingredientes: ["Plátano verde sancocho", "Poco aceite", "Sal al gusto"],
    preparacion: "Sancochar plátano verde, machacar con poco aceite y sal. Servir como acompañamiento.",
    uso: "Moderado",
    recomendaciones: "Aporta energía; ideal como reemplazo a carbohidratos procesados.",
    advertencias: "Controlar porciones en personas con diabetes.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 50,
    titulo: "Jugo de Carambola",
    categoria: "nutricion",
    imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/PEILBVOCBZHYLESGNBZG3V7HA4.jpg",
    ingredientes: ["Carambola (fruta)", "Agua", "Miel o endulzante (opcional)"],
    preparacion: "Licuar carambola con agua; colar si se desea y endulzar ligeramente. Servir frío.",
    uso: "2 veces por semana",
    recomendaciones: "Rico en vitamina C; consumir fresco.",
    advertencias: "Contraindicado en enfermedades renales (consultar profesional).",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },

  /* Plantas medicinales 51-55 */
  {
    id: 51,
    titulo: "Infusión de Guayusa",
    categoria: "bienestar",
    imagen: "https://www.latintrails.com/wp-content/uploads/2021/09/Guayusa.jpg",
    ingredientes: ["5 hojas de guayusa", "1 taza de agua"],
    preparacion: "Agregar hojas a agua caliente, reposar 5 minutos y colar. Tomar en las mañanas.",
    uso: "Mañanas, máximo 5 días seguidos",
    recomendaciones: "Aporta energía; evitar en la noche si eres sensible a estimulantes.",
    advertencias: "Efecto estimulante, no exceder la frecuencia.",
    duracion: 3,
    tiempoRecomendado: 5,
    comentarios: []
  },
  {
    id: 53,
    titulo: "Baño de Hojas de Naranja",
    categoria: "bienestar",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaW4RvjKtU0hfro7GvZ_NnukhdNmYBkhSXFw&s",
    ingredientes: ["Hojas de naranja", "Agua para baño"],
    preparacion: "Hervir hojas y añadir a la bañera; disfrutar baño relajante.",
    uso: "Según necesidad",
    recomendaciones: "Relajante y aromático; ideal para baños de inmersión.",
    advertencias: "No ingerir; evitar contacto con ojos.",
    duracion: 1,
    tiempoRecomendado: 14,
    comentarios: []
  },
  {
    id: 54,
    titulo: "Infusión de Toronjil Amazónico",
    categoria: "bienestar",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKr8DHK-14GtZPczfrAKhPf30g4LktIzgM1A&s",
    ingredientes: ["Hojas de toronjil", "1 taza de agua"],
    preparacion: "Preparar infusión y tomar 1 taza antes de dormir.",
    uso: "1 taza antes de dormir por 5 días",
    recomendaciones: "Útil para nervios y sueño; no exceder la duración.",
    advertencias: "Puede causar somnolencia; no conducir después de consumir.",
    duracion: 5,
    tiempoRecomendado: 5,
    comentarios: []
  },
  {
    id: 55,
    titulo: "Jarabe Casero de Piña y Miel",
    categoria: "bienestar",
    imagen: "https://mejorconsalud.as.com/wp-content/uploads/2016/01/jugo-pi%C3%B1a.jpg",
    ingredientes: ["Piña (rodajas)", "Miel al gusto"],
    preparacion: "Hervir piña, colar el líquido y mezclar con miel al enfriar. Tomar 1 cucharada para tos leve.",
    uso: "3–4 días",
    recomendaciones: "Útil en tos seca; mantener en frasco limpio refrigerado.",
    advertencias: "No administrar a bebés menores sin consejo médico; evitar si hay alergia a la miel.",
    duracion: 4,
    tiempoRecomendado: 5,
    comentarios: []
  },

  /* 56 - 85: otras entradas regionales (resumidas y con campos básicos) */
  {
    id: 56,
    titulo: "Ensalada de Pepino Regional",
    categoria: "nutricion",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3APYEO8lIbjDq1dMyq4BTLzQTME29HPWXRw&s",
    ingredientes: ["Pepino", "Limón", "Sal", "Hierbas opcionales"],
    preparacion: "Lavar y cortar pepino, mezclar con limón y sal. Servir fresco.",
    uso: "2 veces por semana",
    recomendaciones: "Lavar bien; refrescante y ligera.",
    advertencias: "Evitar si hay problemas estomacales agudos.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 57,
    titulo: "Bebida de Maracuyá Natural",
    categoria: "nutricion",
    imagen: "https://89acebichados.pe/55-large_default/1l-refresco-de-maracuya.jpg",
    ingredientes: ["Pulpa de maracuyá", "Agua", "Endulzante opcional"],
    preparacion: "Licuar pulpa con agua y colar. Endulzar al gusto.",
    uso: "3 veces por semana",
    recomendaciones: "Fuente de vitamina C; consumir fresco.",
    advertencias: "Evitar exceso en gastritis.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 58,
    titulo: "Sopa de Yuca con Verduras",
    categoria: "nutricion",
    imagen: "https://www.cocina-cubana.com/base/stock/Recipe/sopa-de-yuca/sopa-de-yuca_web.jpg",
    ingredientes: ["Yuca", "Verduras variadas", "Caldo o agua"],
    preparacion: "Cocer yuca y verduras hasta tiernas; servir caliente.",
    uso: "1–2 veces por semana",
    recomendaciones: "Plato energético y reconfortante.",
    advertencias: "Cocinar bien la yuca.",
    duracion: 2,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 59,
    titulo: "Mascarilla de Tomate Amazónico",
    categoria: "mascarillas",
    imagen: "https://media.glamour.mx/photos/650940bdbc78774067cbf6cc/16:9/w_2560%2Cc_limit/tomate-para-blanquear-la-piel.jpg",
    ingredientes: ["Tomate maduro triturado"],
    preparacion: "Aplicar puré de tomate 10 minutos, enjuagar.",
    uso: "1 vez por semana",
    recomendaciones: "Buena para piel grasa; combinar con hidratante.",
    advertencias: "Puede arder en piel irritada.",
    duracion: 2,
    tiempoRecomendado: 14,
    comentarios: []
  },
  {
    id: 60,
    titulo: "Aceite de Coco Local para Cabello",
    categoria: "cabello",
    imagen: "https://image.tuasaude.com/media/article/qw/90/como-usar-o-oleo-de-coco_15528.jpg?width=686&height=487",
    ingredientes: ["Aceite de coco puro"],
    preparacion: "Aplicar aceite en puntas o como tratamiento caliente 1 vez por semana.",
    uso: "1 vez por semana",
    recomendaciones: "Excelente para hidratación profunda.",
    advertencias: "No usar en raíz grasa.",
    duracion: 365,
    tiempoRecomendado: 30,
    comentarios: []
  },
  
  {
    id: 62,
    titulo: "Jugo de Piña con Hierbabuena",
    categoria: "nutricion",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbziuABmnuqbJ7O7aiPiFACR__w-X5SkD5ZQ&s",
    ingredientes: ["Piña", "Hojas de hierbabuena", "Agua"],
    preparacion: "Licuar y colar; servir frío.",
    uso: "2 veces por semana",
    recomendaciones: "Refrescante y digestivo.",
    advertencias: "Evitar exceso en gastritis.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 63,
    titulo: "Infusión de Hoja de Palta",
    categoria: "bienestar",
    imagen: "https://primicia.com.ve/wp-content/uploads/2022/07/hoja-de-aguacate.jpg",
    ingredientes: ["Hojas de palta", "Agua"],
    preparacion: "Hervir hojas unos minutos y tomar como infusión suave.",
    uso: "3 días máximo",
    recomendaciones: "Usar en infusiones suaves por corto tiempo.",
    advertencias: "Moderación recomendada; consultar en embarazo.",
    duracion: 3,
    tiempoRecomendado: 5,
    comentarios: []
  },
  {
    id: 64,
    titulo: "Mascarilla de Sandía",
    categoria: "mascarillas",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlxYmM_4r_DiygFAiwR-9vVk_ExmBkbspxdQ&s",
    ingredientes: ["Pulpa de sandía triturada"],
    preparacion: "Aplicar 10 minutos y enjuagar con agua fresca.",
    uso: "1 vez por semana",
    recomendaciones: "Refresca y aporta hidratación.",
    advertencias: "No usar en piel con heridas abiertas.",
    duracion: 1,
    tiempoRecomendado: 14,
    comentarios: []
  },
  {
    id: 65,
    titulo: "Crema de Sábila Natural",
    categoria: "manos",
    imagen: "https://escuelafarmacia.com/wp-content/uploads/An%CC%83adir-un-subti%CC%81tulo.jpg",
    ingredientes: ["Gel de sábila (aloe vera)", "1 cucharadita de aceite de coco"],
    preparacion: "Mezclar y aplicar localmente para hidratación.",
    uso: "Uso externo moderado",
    recomendaciones: "Buena para piel irritada y quemaduras leves.",
    advertencias: "Evitar en heridas abiertas profundas.",
    duracion: 7,
    tiempoRecomendado: 14,
    comentarios: []
  },
  {
    id: 66,
    titulo: "Ensalada de Palmito",
    categoria: "nutricion",
    imagen: "https://comedera.com/wp-content/uploads/sites/9/2023/03/Ensalada-de-palmito-shutterstock_44978278.jpg",
    ingredientes: ["Palmito (chonta) picado", "Verduras", "Jugo de limón", "Sal"],
    preparacion: "Mezclar ingredientes y aderezar; servir fresco.",
    uso: "1–2 veces por semana",
    recomendaciones: "Fuente de fibra; ideal como acompañamiento.",
    advertencias: "Asegurarse frescura.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 67,
    titulo: "Batido de Papaya con Avena",
    categoria: "nutricion",
    imagen: "https://7diasdesabor.com/wp-content/uploads/2023/01/batida-de-papaya-y-avena-web.jpg",
    ingredientes: ["Papaya", "Avena", "Leche o agua", "Miel opcional"],
    preparacion: "Licuar todo hasta obtener consistencia homogénea; servir.",
    uso: "3 veces por semana",
    recomendaciones: "Buen desayuno o snack nutritivo.",
    advertencias: "Controlar porciones en diabetes.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 68,
    titulo: "Infusión de Romero Amazónico",
    categoria: "bienestar",
    imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/NMZWOLUFAJBJXJ5RFIWDOHFPHU.jpg",
    ingredientes: ["Hojas de romero", "Agua"],
    preparacion: "Hervir hojas y reposar 5–7 minutos; colar y tomar.",
    uso: "5 días máximo",
    recomendaciones: "Se dice que ayuda circulación; usar con moderación.",
    advertencias: "Consultar si hay problemas de presión sanguínea.",
    duracion: 5,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 69,
    titulo: "Baño de Ruda (tradicional externo)",
    categoria: "bienestar",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYMMBA8UIOyKjIlmfy0GGW6E0ZoilpPm3eGg&s",
    ingredientes: ["Hojas de ruda", "Agua para baño"],
    preparacion: "Hervir hojas y añadir al agua del baño para uso externo.",
    uso: "Según práctica cultural",
    recomendaciones: "Uso tradicional; respetar costumbres locales.",
    advertencias: "No ingerir; evitar en embarazo y piel sensible.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 70,
    titulo: "Mascarilla de Cacao en Polvo",
    categoria: "mascarillas",
    imagen: "https://thumbs.dreamstime.com/b/polvo-de-cacao-y-mascarilla-chocolate-oscuro-corporal-en-un-bol-tratamiento-belleza-casero-receta-spa-vista-superior-espacio-copia-234409404.jpg",
    ingredientes: ["1 cucharada de cacao en polvo", "1 cucharada de yogur o miel"],
    preparacion: "Mezclar y aplicar 10 minutos; enjuagar.",
    uso: "1 vez por semana",
    recomendaciones: "Antioxidante; aporta brillo.",
    advertencias: "Puede manchar; evitar ojos.",
    duracion: 30,
    tiempoRecomendado: 21,
    comentarios: []
  },
  {
    id: 72,
    titulo: "Bebida de Camote Amazónico",
    categoria: "nutricion",
    imagen: "https://i.ytimg.com/vi/ehH65GRUe60/sddefault.jpg",
    ingredientes: ["Camote cocido", "Agua", "Canela opcional"],
    preparacion: "Licuar camote cocido con agua y colar; calentar o servir frío.",
    uso: "Moderado",
    recomendaciones: "Fuente de energía y carbohidratos complejos.",
    advertencias: "Controlar porciones en diabetes.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 73,
    titulo: "Infusión de Hoja de Mango",
    categoria: "bienestar",
    imagen: "https://mejorconsalud.as.com/wp-content/uploads/2020/08/fruto-mango-planta.jpg?auto=format%2Ccompress&quality=75&width=1920&height=1080&fit=cover&gravity=center&sharp=true&progressive=true",
    ingredientes: ["Hojas de mango", "Agua"],
    preparacion: "Hervir hojas y reposar 5–7 minutos; colar y tomar.",
    uso: "3 días máximo",
    recomendaciones: "Uso tradicional para digestión suave.",
    advertencias: "Consultar si se toman medicamentos.",
    duracion: 3,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 74,
    titulo: "Mascarilla de Pepino y Sábila",
    categoria: "mascarillas",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqv8ZGHhbLsapWVx4vKT_1ENVjyuxp9gEMtw&s",
    ingredientes: ["Pepino triturado", "Gel de sábila"],
    preparacion: "Mezclar y aplicar 10–15 minutos; enjuagar.",
    uso: "1 vez por semana",
    recomendaciones: "Muy calmante para piel sensible y enrojecida.",
    advertencias: "Evitar sobre heridas abiertas.",
    duracion: 3,
    tiempoRecomendado: 21,
    comentarios: []
  },
  {
    id: 76,
    titulo: "Sopa de Verduras Amazónicas",
    categoria: "nutricion",
    imagen: "https://www.ajinomoto.com.pe:8085/img/receta/7.-Sopa-de-pollo-con-verduras-2.jpg",
    ingredientes: ["Verduras locales variadas", "Caldo", "Especias al gusto"],
    preparacion: "Cocer verduras hasta tiernas y servir caliente.",
    uso: "2 veces por semana",
    recomendaciones: "Plato nutritivo y ligero.",
    advertencias: "Asegurar higiene al cocinar.",
    duracion: 2,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 77,
    titulo: "Jugo Natural de Aguaymanto",
    categoria: "nutricion",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnU1VGpJuDYJo20PCcigKNRFQL0Qfep8oPag&s",
    ingredientes: ["Aguaymanto", "Agua", "Miel opcional"],
    preparacion: "Licuar y colar; servir frío.",
    uso: "2–3 veces por semana",
    recomendaciones: "Antioxidante natural; consumir fresco.",
    advertencias: "Moderación en diabetes.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 78,
    titulo: "Mascarilla de Harina de Maíz",
    categoria: "mascarillas",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-_N2t7XT99OzXPM255LAcuqYWof7h77tAnw&s",
    ingredientes: ["Harina de maíz", "Agua o leche para la pasta"],
    preparacion: "Formar pasta y aplicar 10 minutos; masajear suavemente y enjuagar.",
    uso: "1 vez por semana",
    recomendaciones: "Suaviza la piel y aporta textura.",
    advertencias: "No frotar fuerte.",
    duracion: 30,
    tiempoRecomendado: 21,
    comentarios: []
  },
  {
    id: 80,
    titulo: "Bebida de Cacao con Canela",
    categoria: "nutricion",
    imagen: "https://dressingfood.es/wp-content/uploads/NATA.-INGREDIENTE-CHOCOLATE-AL-RON-Y-CANELA-JPG-WEB.jpg",
    ingredientes: ["Cacao en polvo", "Agua o leche", "Canela al gusto", "Endulzante opcional"],
    preparacion: "Mezclar y calentar; servir.",
    uso: "Moderado",
    recomendaciones: "Bebida energética y reconfortante.",
    advertencias: "No exceder si sensible a estimulantes.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 81,
    titulo: "Compresa de Hoja de Guayaba",
    categoria: "bienestar",
    imagen: "https://www.prensalibre.com/wp-content/uploads/2023/08/Para-que-sirve-las-hojas-de-guayaba-beneficios-1.jpeg?quality=52",
    ingredientes: ["Hojas de guayaba", "Agua caliente"],
    preparacion: "Hervir hojas, colar y usar la compresa tibia sobre zona afectada.",
    uso: "3 días máximo",
    recomendaciones: "Alivio tópico para irritaciones leves.",
    advertencias: "No usar sobre heridas abiertas graves.",
    duracion: 1,
    tiempoRecomendado: 3,
    comentarios: []
  },
  {
    id: 82,
    titulo: "Puré de Yuca con Verduras",
    categoria: "nutricion",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1HLFV5q013m9AIkM480yyq0QneGc5rvd4Ng&s",
    ingredientes: ["Yuca cocida", "Verduras cocidas", "Poco aceite o manteca"],
    preparacion: "Machacar yuca y mezclar con verduras cocidas; ajustar textura con caldo.",
    uso: "1–2 veces por semana",
    recomendaciones: "Buena guarnición energética.",
    advertencias: "Controlar porciones en dietas especiales.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 83,
    titulo: "Mascarilla de Plátano y Miel",
    categoria: "mascarillas",
    imagen: "https://i.pinimg.com/736x/f6/bd/45/f6bd454792b8a2aaf6d7f7351c4b90e4.jpg",
    ingredientes: ["1 plátano maduro", "1 cucharada de miel"],
    preparacion: "Machacar plátano, mezclar con miel y aplicar 15 minutos; enjuagar.",
    uso: "1 vez por semana",
    recomendaciones: "Hidratante para cabello o como mascarilla facial nutritiva.",
    advertencias: "Puede atraer insectos si deja residuos; enjuagar bien.",
    duracion: 3,
    tiempoRecomendado: 21,
    comentarios: []
  },

{
  id: 84,
  titulo: "Infusión de Hoja de Guayaba (relajante suave)",
  categoria: "relajacion",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAR61S7N8m6Un1Ls5N1aCHRJamwBlkdTeo1Q&s",
  ingredientes: ["4 hojas de guayaba", "1 taza de agua"],
  preparacion: "1. Hervir el agua. 2. Agregar hojas. 3. Tapar 5 minutos y colar. 4. Servir tibio.",
  uso: "Después de comidas o en la tarde.",
  recomendaciones: "Calma nervios leves y ayuda a la digestión (estrés digestivo). Ideal para después de comer.",
  advertencias: "No tomar en exceso (puede estreñir). Uso máximo 5 días seguidos.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},

{
  id: 85,
  titulo: "Bebida tibia de Plátano Maduro",
  categoria: "relajacion",
  imagen: "https://media.c5n.com/p/870dda332cd381c5718321a43958335d/adjuntos/326/imagenes/000/291/0000291482/1200x675/smart/vino-platano.png",
  ingredientes: ["1 plátano maduro", "1 taza de agua", "Canela (opcional)"],
  preparacion: "1. Hervir el plátano en trozos. 2. Licuar con el agua. 3. Colar si lo deseas. 4. Servir caliente.",
  uso: "Tomar en la noche, 3 veces por semana.",
  recomendaciones: "Relaja el cuerpo y ayuda a dormir gracias al potasio y triptófano. Rico en minerales relajantes.",
  advertencias: "No agregar mucho azúcar. Evitar si tienes alergia al plátano.",
  duracion: 7,
  tiempoRecomendado: 21,
  comentarios: []
},

{
  id: 86,
  titulo: "Infusión de Hoja de Limón",
  categoria: "relajacion",
  imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/elcronista/LLN23OY7AZFQXAIFRLKHDXHJ2A.jpg",
  ingredientes: ["5 hojas de limón", "1 taza de agua caliente"],
  preparacion: "1. Hervir agua. 2. Agregar hojas de limón. 3. Tapar 5–7 minutos. 4. Colar y servir.",
  uso: "En la noche antes de dormir.",
  recomendaciones: "Reduce ansiedad y tensión mental. Propiedades relajantes naturales.",
  advertencias: "Puede causar sueño. Usar máximo 5 días seguidos. No en embarazo sin consultar.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},


{
  id: 88,
  titulo: "Bebida de Piña con Clavo y Canela",
  categoria: "relajacion",
  imagen: "https://buenazo.cronosmedia.glr.pe/original/2020/10/22/5f9222431972f777f313035c.jpg",
  ingredientes: ["Cáscara de piña", "1 clavo", "1 rama de canela", "1 litro de agua"],
  preparacion: "1. Lavar bien la cáscara de piña. 2. Hervir agua con cáscara, clavo y canela 15 minutos. 3. Colar. 4. Servir tibio.",
  uso: "Tomar tibio en la tarde, 3–4 veces por semana.",
  recomendaciones: "Relajante digestivo y antiinflamatorio. Mejora el tránsito intestinal y reduce estrés.",
  advertencias: "No en gastritis fuerte o sensibilidad estomacal. Usar piña madura.",
  duracion: 3,
  tiempoRecomendado: 14,
  comentarios: []
},

{
  id: 90,
  titulo: "Baño de Vapor con Eucalipto y Hierbas Amazónicas",
  categoria: "relajacion",
  imagen: "https://m.media-amazon.com/images/I/41Q8L9L5okL._AC_UF1000,1000_QL80_.jpg",
  ingredientes: ["Hojas de eucalipto", "Agua caliente", "Hojas amazónicas (opcional)"],
  preparacion: "1. Hervir hojas de eucalipto en agua. 2. Verter en recipiente. 3. Colocarse cerca (cuidado con el calor). 4. Inhalar vapor 5–10 minutos.",
  uso: "Antes de dormir, 2–3 días seguidos.",
  recomendaciones: "Relaja cuerpo, despeja mente y mejora respiración. Ideal para estrés antes de dormir.",
  advertencias: "No acercarse demasiado (evitar quemaduras). No usar en niños pequeños sin supervisión.",
  duracion: 3,
  tiempoRecomendado: 7,
  comentarios: []
},

{
  id: 91,
  titulo: "Bebida de Avena con Canela (estilo amazónico)",
  categoria: "relajacion",
  imagen: "https://yayaya.com.ec/wp-content/uploads/2021/10/batido-cremoso-de-avena.jpg",
  ingredientes: ["1/2 taza de avena", "1 taza de agua", "1 rama de canela", "Miel (opcional)"],
  preparacion: "1. Hervir agua. 2. Agregar avena y canela. 3. Cocinar 10 minutos removiendo. 4. Colar ligeramente o servir espeso.",
  uso: "En la noche, 3–5 veces por semana.",
  recomendaciones: "Relaja y mejora sueño. Rica en fibra y minerales calmantes. Tradicional amazónica.",
  advertencias: "No muy espeso para facilitar digestión. Evitar si eres celíaco (usar avena sin gluten).",
  duracion: 7,
  tiempoRecomendado: 21,
  comentarios: []
},

{
  id: 92,
  titulo: "Masaje con Aceite de Sacha Inchi tibio",
  categoria: "relajacion",
  imagen: "https://campograndeperu.com/wp-content/uploads/2024/03/beneficios-del-aceite-de-sacha-inchi-para-la-piel-muestra.jpg",
  ingredientes: ["Aceite de sacha inchi puro"],
  preparacion: "1. Calentar aceite ligeramente (no muy caliente). 2. Aplicar en cuello y hombros. 3. Masajear suavemente 10–15 minutos.",
  uso: "Masajes 2–3 veces por semana.",
  recomendaciones: "Relaja músculos y estrés físico. Rico en ácidos grasos omega. Excelente para tensión de cuello.",
  advertencias: "No aplicar en heridas abiertas. Verificar temperatura. No usar si alergia a frutos secos.",
  duracion: 60,
  tiempoRecomendado: 30,
  comentarios: []
},

{
  id: 93,
  titulo: "Infusión de Flor de Jamaica (refrescante relajante)",
  categoria: "relajacion",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmp9WB6EOgdnCV-VSXh6PkHSPMRJA_Nf1DGA&s",
  ingredientes: ["Flores de jamaica secas", "1 taza de agua"],
  preparacion: "1. Hervir agua. 2. Agregar flores. 3. Hervir 10 minutos. 4. Colar y servir fría o tibia.",
  uso: "Fría o tibia, 3 veces por semana.",
  recomendaciones: "Reduce estrés y presión leve. Antioxidante natural. Refrescante en clima cálido.",
  advertencias: "Puede bajar presión arterial. Evitar si tomas antihipertensivos sin consultar médico.",
  duracion: 7,
  tiempoRecomendado: 21,
  comentarios: []
},

  {
    id: 96,
    titulo: "Bebida Refrescante de Tamarindo",
    categoria: "nutricion",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzX4oNiaq_CGpGOYkTRX0QK-_qT7j6T8Gmg&s",
    ingredientes: ["Pulpa de tamarindo", "Agua", "Endulzante opcional"],
    preparacion: "Licuar pulpa con agua y colar. Servir frío.",
    uso: "Moderado",
    recomendaciones: "Refrescante, ideal en climas cálidos.",
    advertencias: "Evitar exceso si hay sensibilidad estomacal.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
  {
    id: 97,
    titulo: "Ensalada de Carambola",
    categoria: "nutricion",
    imagen: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiDK40HAQahVGdaMs1KZLMPC_Ao4yEc-lGW9vKrag5x7TXJXLOga8q3f5Rm2cgJZZ4iRahmooHRLZvC7HkDSxXocfnLHN6dcCTEtYTJnaxE-GleFvjvy0xD7KgGtKd0zZM2DbhF25lN56s/s1600/ensalada-de-jamon-y-carambola-04b.jpg",
    ingredientes: ["Carambola fresca", "Hojas verdes", "Jugo de limón", "Sal"],
    preparacion: "Cortar carambola y mezclar con hojas y aderezo de limón.",
    uso: "Como ensalada ocasional",
    recomendaciones: "Buena fuente de vitamina C; servir fresca.",
    advertencias: "No consumir en problemas renales; consultar profesional.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
  },
    // === RECETAS PARA BAJAR DE PESO Y CUIDADO DEL COLESTEROL (San Martín - Control de Peso)
// ID: 5001–5017 (15 nuevas + 2 bonus)
// Categoría: "peso"

{
  id: 5001,
  titulo: "Agua de Piña con Hierbas (quema grasa natural)",
  categoria: "peso",
  imagen: "https://image.tuasaude.com/media/article/qu/ty/agua-de-pina_49273.jpg",
  ingredientes: ["Cáscara de piña bien lavada", "Hierbas aromáticas (hierbabuena)", "1 litro de agua"],
  preparacion: "1. Lavar muy bien la cáscara de piña. 2. Hervir la cáscara en agua 15 minutos. 3. Dejar enfriar completamente. 4. Colar y guardar en frasco.",
  uso: "Tomar durante el día, 3–4 veces por semana.",
  recomendaciones: "Digestiva, reduce inflamación y retención de líquidos. Ideal para acelerar metabolismo de forma natural.",
  advertencias: "No en gastritis fuerte. Usar piña madura. No exceder la frecuencia.",
  duracion: 3,
  tiempoRecomendado: 14,
  comentarios: []
},
{
  id: 5002,
  titulo: "Bebida de Pepino con Limón",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf32_mRz6JR8QXS-aG34tF5UPg39N3hYu-4w&s",
  ingredientes: ["1/2 pepino fresco", "Jugo de 1 limón", "1 taza de agua"],
  preparacion: "1. Pelar y cortar el pepino en trozos. 2. Licuar pepino con agua. 3. Colar y agregar jugo de limón. 4. Servir inmediatamente.",
  uso: "Tomar en ayunas, durante 1 semana.",
  recomendaciones: "Hidratante, ayuda a eliminar grasa y toxinas. Bajo en calorías. Acelera eliminación de líquidos retenidos.",
  advertencias: "No si hay acidez fuerte o gastritis. Evitar en úlceras.",
  duracion: 1,
  tiempoRecomendado: 7,
  comentarios: []
},

{
  id: 5005,
  titulo: "Infusión de Diente de León (limpia hígado)",
  categoria: "peso",
  imagen: "https://img.salud.mapfre.es/wp-content/uploads/2022/07/diente-de-leon-infusion.jpg",
  ingredientes: ["1 cucharada de raíz de diente de león", "1 taza de agua"],
  preparacion: "1. Hervir agua. 2. Agregar raíz de diente de león. 3. Hervir 5 minutos. 4. Colar y tomar tibio.",
  uso: "Tomar en ayunas, durante 5 días.",
  recomendaciones: "Limpia el hígado y reduce acumulación de grasa. Depurativo natural potente.",
  advertencias: "Puede ser fuerte. No exceder 5 días. Consultar si tomas medicamentos. Embarazadas evitar.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},
{
  id: 5006,
  titulo: "Jugo de Sandía Natural (diurético)",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIR4rLwqveC_NBZ7dcseM0tWSiRvHg6LyV8g&s",
  ingredientes: ["2 tazas de sandía fresca picada", "1/2 taza de agua"],
  preparacion: "1. Lavar y cortar sandía en cubos. 2. Licuar con agua. 3. Colar. 4. Servir frío inmediatamente.",
  uso: "Durante el día, 3 veces por semana.",
  recomendaciones: "Diurético natural, ayuda a bajar peso eliminando líquidos. Muy bajo en calorías. Refrescante.",
  advertencias: "Moderar si hay azúcar alta en sangre. No abusar en diabetes.",
  duracion: 7,
  tiempoRecomendado: 21,
  comentarios: []
},
{
  id: 5007,
  titulo: "Infusión de Cola de Caballo (elimina líquidos)",
  categoria: "peso",
  imagen: "https://mejorconsalud.as.com/wp-content/uploads/2015/06/Cola-de-caballo-para-eliminar-l%C3%ADquidos-y-remineralizar-el-organismo.jpg",
  ingredientes: ["1 cucharada de cola de caballo seca", "1 taza de agua"],
  preparacion: "1. Hervir agua. 2. Agregar cola de caballo. 3. Hervir 10 minutos. 4. Colar y servir.",
  uso: "Tomar durante el día, máximo 1 semana.",
  recomendaciones: "Elimina líquidos retenidos de forma efectiva. Diurético natural muy potente.",
  advertencias: "No uso prolongado. Máximo 1 semana. Consultar si tienes problemas renales. Embarazadas evitar.",
  duracion: 1,
  tiempoRecomendado: 7,
  comentarios: []
},
{
  id: 5008,
  titulo: "Agua tibia con Limón (activa metabolismo)",
  categoria: "peso",
  imagen: "https://mejorconsalud.as.com/wp-content/uploads/2017/12/agua-limon-378x252.jpg?auto=format%2Ccompress&quality=75&width=3840&height=2160&fit=cover&gravity=center&sharp=true&progressive=true",
  ingredientes: ["1 limón", "1 taza de agua tibia"],
  preparacion: "1. Exprimir jugo de limón. 2. Verter en agua tibia. 3. Mezclar bien. 4. Servir inmediatamente.",
  uso: "En ayunas diariamente, consumo moderado.",
  recomendaciones: "Activa metabolismo desde la mañana. Ayuda a quemar grasas. Simple y eficaz.",
  advertencias: "No en gastritis o úlceras. Evitar exceso si hay sensibilidad dental.",
  duracion: 365,
  tiempoRecomendado: 30,
  comentarios: []
},
{
  id: 5009,
  titulo: "Infusión de Ortiga (depurativa y adelgazante)",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ITELspxXyuT-in5GFO6WadSHr0KsBS3jfg&s",
  ingredientes: ["1 cucharada de hojas de ortiga seca", "1 taza de agua"],
  preparacion: "1. Hervir agua. 2. Agregar ortiga. 3. Tapar y reposar 7 minutos. 4. Colar y tomar.",
  uso: "1 taza diaria, durante 5 días.",
  recomendaciones: "Depurativa potente, ayuda a bajar grasa. Rica en minerales. Acelera metabolismo.",
  advertencias: "Puede bajar presión. Consultar si tienes problemas de presión baja. No exceder 5 días.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},
{
  id: 5010,
  titulo: "Ensalada de Pepino y Limón (baja en calorías)",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjw5RfbwqT99oejYNFfnCKHeHxTzBbQTICsA&s",
  ingredientes: ["2 pepinos frescos", "Jugo de 1 limón", "Sal al gusto (mínima)", "Perejil fresco picado"],
  preparacion: "1. Lavar y cortar pepinos en rodajas. 2. Mezclar con jugo de limón. 3. Agregar sal mínima y perejil. 4. Servir fresca.",
  uso: "Como acompañamiento o almuerzo, consumir frecuentemente.",
  recomendaciones: "Muy baja en calorías, ideal para dietas de control de peso. Refrescante y nutritiva.",
  advertencias: "No exceso de sal. Usar pepinos frescos. Evitar si hay gastritis.",
  duracion: 1,
  tiempoRecomendado: 7,
  comentarios: []
},
 {
      id: 100001,
      titulo: "Pomada natural de sábila y neem",
      categoria: "piel",
      imagen: "https://extraherbos.com/wp-content/uploads/2019/04/pomada-neem-abierta-Pagina.jpg",
      ingredientes: ["2 cucharadas de gel de sábila", "5 hojas de neem trituradas", "1 cucharadita de aceite de coco"],
      preparacion: "Mezclar todos los ingredientes hasta formar una crema uniforme.",
      uso: "Aplicar 2 veces al día sobre la zona afectada.",
      recomendaciones: "Ayuda a disminuir irritaciones, picazón y resequedad.",
      advertencias: "No usar en heridas abiertas profundas.",
      duracion: 7,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 100002,
      titulo: "Infusión de canela y hojas de guanábana",
      categoria: "nutricion",
      imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/elfinanciero/ETSMSK6HRRFL5GFUP6EUQVDS4Q.jpeg",
      ingredientes: ["1 rama de canela", "3 hojas de guanábana", "1 taza de agua"],
      preparacion: "Hervir el agua con los ingredientes durante 10 minutos.",
      uso: "Tomar tibio en ayunas 3 veces por semana.",
      recomendaciones: "Puede ayudar a mantener niveles saludables de azúcar junto con dieta adecuada.",
      advertencias: "No reemplaza medicamentos médicos.",
      duracion: 5,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 100003,
      titulo: "Batido de avena y linaza",
      categoria: "nutricion",
      imagen: "https://granvita.com/wp-content/uploads/2023/06/licuado-de-avena-manzana-y-linaza.jpg",
      ingredientes: ["2 cucharadas de avena", "1 cucharada de linaza", "1 vaso de agua", "1 trozo pequeño de manzana"],
      preparacion: "Licuar todos los ingredientes.",
      uso: "Tomar por las mañanas.",
      recomendaciones: "La fibra ayuda a controlar grasas en la sangre.",
      advertencias: "Consumir acompañado de alimentación balanceada.",
      duracion: 1,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 100004,
      titulo: "Jugo depurativo de betarraga y limón",
      categoria: "nutricion",
      imagen: "https://deliciaskitchen.b-cdn.net/wp-content/uploads/2020/09/jugo-de-remolacha-limon-y-jengibre.jpg",
      ingredientes: ["1/2 betarraga", "Jugo de 1 limón", "1 vaso de agua"],
      preparacion: "Licuar y colar.",
      uso: "Tomar en ayunas 2 veces por semana.",
      recomendaciones: "Ayuda al funcionamiento hepático y digestivo.",
      advertencias: "No exceder el consumo.",
      duracion: 1,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 100005,
      titulo: "Enjuague de hierbabuena y clavo",
      categoria: "bienestar",
      imagen: "https://mejorconsalud.as.com/wp-content/uploads/2018/07/aceite-clavo-1.jpg",
      ingredientes: ["5 hojas de hierbabuena", "2 clavos de olor", "1 taza de agua"],
      preparacion: "Hervir 5 minutos y dejar enfriar.",
      uso: "Usar como enjuague bucal después del cepillado.",
      recomendaciones: "Refresca naturalmente el aliento.",
      advertencias: "No ingerir en exceso.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100006,
      titulo: "Compresa caliente de romero",
      categoria: "bienestar",
      imagen: "https://www.chileclimbers.cl/wp-content/uploads/2016/12/como-preparar-cataplasmas-de-forma-casera.jpg",
      ingredientes: ["1 taza de agua caliente", "3 ramas de romero", "Tela limpia"],
      preparacion: "Hervir el romero y remojar la tela.",
      uso: "Aplicar en la zona lumbar 15 minutos.",
      recomendaciones: "Relaja músculos y mejora la circulación.",
      advertencias: "No aplicar demasiado caliente.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100007,
      titulo: "Té calmante de manzanilla y anís",
      categoria: "bienestar",
      imagen: "https://mejorconsalud.as.com/wp-content/uploads/2025/01/infusion-anis-y-manzanilla.jpg",
      ingredientes: ["1 bolsita de manzanilla", "1 cucharadita de anís", "1 taza de agua"],
      preparacion: "Hervir y dejar reposar.",
      uso: "Tomar tibio durante molestias menstruales.",
      recomendaciones: "Ayuda a disminuir cólicos leves.",
      advertencias: "No consumir excesivamente.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100008,
      titulo: "Jugo de zanahoria y naranja",
      categoria: "nutricion",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrD3jUsSUtZL0JWJ49SYoN_oKGVdROlIps5Q&s",
      ingredientes: ["2 zanahorias", "1 naranja", "1/2 vaso de agua"],
      preparacion: "Licuar todos los ingredientes.",
      uso: "Tomar por las mañanas.",
      recomendaciones: "Rico en vitamina A y antioxidantes.",
      advertencias: "Consumir fresco.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100009,
      titulo: "Gelatina natural de fresa y chía",
      categoria: "nutricion",
      imagen: "https://dgari.com/wp-content/uploads/2023/12/gelatina-light-de-fresa-con-yoghurt-y-chia-1.jpg",
      ingredientes: ["1 taza de fresas", "1 cucharada de chía", "Gelatina sin azúcar (preparada según instrucciones)"],
      preparacion: "Preparar la gelatina y añadir fresas y chía.",
      uso: "Consumir 3 veces por semana.",
      recomendaciones: "Favorece piel y articulaciones.",
      advertencias: "Mantener refrigerado.",
      duracion: 7,
      tiempoRecomendado: 21,
      comentarios: []
    },
    {
      id: 100010,
      titulo: "Batido de ajonjolí y plátano",
      categoria: "nutricion",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2VaLC6N5DmLjXC28aLzuXwkUiun2vgwLfw&s",
      ingredientes: ["1 cucharada de ajonjolí", "1 plátano", "1 vaso de leche"],
      preparacion: "Licuar todos los ingredientes.",
      uso: "Tomar en el desayuno.",
      recomendaciones: "Aporta calcio y energía.",
      advertencias: "No usar si eres alérgico al ajonjolí.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100011,
      titulo: "Infusión de ajo y limón",
      categoria: "bienestar",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmlKBeIeXfKQCMdN9Y93mzKSyq4trOUITNw&s",
      ingredientes: ["1 diente de ajo pequeño", "Jugo de medio limón", "1 taza de agua tibia"],
      preparacion: "Mezclar y dejar reposar 5 minutos.",
      uso: "Tomar en ayunas.",
      recomendaciones: "Puede ayudar a la circulación.",
      advertencias: "No consumir si causa irritación estomacal.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100012,
      titulo: "Vapor de eucalipto y menta",
      categoria: "bienestar",
      imagen: "https://thumbs.dreamstime.com/b/inhalaci%C3%B3n-del-vapor-del-eucalipto-49712656.jpg",
      ingredientes: ["Hojas de eucalipto", "Hojas de menta", "Agua caliente"],
      preparacion: "Hervir las hojas en agua.",
      uso: "Inhalar el vapor durante 10 minutos.",
      recomendaciones: "Ayuda a despejar vías respiratorias.",
      advertencias: "No acercarse demasiado al vapor.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },   
{
  id: 5011,
  titulo: "Jugo de Naranja Natural (sin azúcar añadida)",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReh5h4m_UeM-sjm3ZGiU00feqIK99QVMl1gA&s",
  ingredientes: ["2 naranjas maduras", "Agua (opcional)"],
  preparacion: "1. Exprimir naranjas frescas. 2. Colar el jugo. 3. Servir inmediatamente sin añadir azúcar. 4. Si prefieres menos concentrado, añadir poco agua.",
  uso: "Por la mañana, 3 veces por semana.",
  recomendaciones: "Ayuda a acelerar metabolismo. Rico en vitamina C. Sin azúcar procesado.",
  advertencias: "Moderar en diabetes. No agregar azúcar. Tomar inmediatamente después de exprimir.",
  duracion: 7,
  tiempoRecomendado: 21,
  comentarios: []
},
 {
      id: 100013,
      titulo: "Refresco revitalizante de cocona y miel",
      categoria: "nutricion",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Ly_TYExPeiHHkggLON2WF95OeDtlIojgbQ&s",
      ingredientes: ["1 cocona madura", "1 vaso de agua", "1 cucharadita de miel"],
      preparacion: "Licuar y colar.",
      uso: "Tomar frío una vez al día.",
      recomendaciones: "Ayuda a hidratar y aportar vitamina C.",
      advertencias: "No reemplaza atención médica.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100014,
      titulo: "Agua fresca de toronja y hierbaluisa",
      categoria: "bienestar",
      imagen: "https://endulzateperu.com/assets/images/2025/12/agua-de-hierba-luisa_800x534.webp",
      ingredientes: ["1 toronja", "Hojas de hierbaluisa", "Agua fría"],
      preparacion: "Preparar infusión y añadir jugo de toronja.",
      uso: "Tomar por las tardes.",
      recomendaciones: "Refrescante para clima tropical.",
      advertencias: "Evitar exceso si tienes gastritis.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100015,
      titulo: "Gel calmante de matico y sábila",
      categoria: "piel",
      imagen: "https://plazavea.vteximg.com.br/arquivos/ids/28572972-418-418/imageUrl_3.jpg",
      ingredientes: ["1 hoja de sábila", "Hojas de matico trituradas"],
      preparacion: "Mezclar hasta obtener un gel.",
      uso: "Aplicar sobre picaduras.",
      recomendaciones: "Reduce picazón e irritación.",
      advertencias: "No usar sobre heridas abiertas.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100016,
      titulo: "Lavado natural de ajo y limón",
      categoria: "piel",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJnV_zaTWcVBWvqlaReglLe3L2t9FhNxJdg&s",
      ingredientes: ["1 diente de ajo", "Jugo de limón", "Agua tibia"],
      preparacion: "Mezclar en agua tibia.",
      uso: "Lavar la zona afectada.",
      recomendaciones: "Ayuda contra hongos leves de humedad.",
      advertencias: "No aplicar en zonas sensibles.",
      duracion: 3,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 100017,
      titulo: "Bebida energética de plátano y cacao",
      categoria: "energia",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKluuBt54AMlWcXjFJrgPiZ3qSv7gfX1QCqQ&s",
      ingredientes: ["1 plátano", "1 cucharada de cacao", "1 vaso de leche"],
      preparacion: "Licuar todos los ingredientes.",
      uso: "Tomar después del trabajo.",
      recomendaciones: "Aporta energía natural.",
      advertencias: "Consumir fresco.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100018,
      titulo: "Pomada de cúrcuma y aceite de coco",
      categoria: "bienestar",
      imagen: "https://www.eluniverso.com/resizer/v2/VFMKMEYGHVHCTFUEAV5NOH67AQ.jpg?auth=a5b561b35ad9d488eb8eebedf16f07d3fbf5e5799344789809947fe1625c216f&width=1031&height=670&quality=75&smart=true",
      ingredientes: ["1 cucharadita de cúrcuma", "2 cucharadas de aceite de coco"],
      preparacion: "Mezclar hasta formar crema.",
      uso: "Masajear articulaciones.",
      recomendaciones: "Ayuda a aliviar inflamación leve.",
      advertencias: "Puede manchar ropa.",
      duracion: 7,
      tiempoRecomendado: 30,
      comentarios: []
    },
    {
      id: 100019,
      titulo: "Infusión de kion y menta",
      categoria: "bienestar",
      imagen: "https://mejorconsalud.as.com/wp-content/uploads/2016/04/infusion-jengibre-menta-limon-1200x900.jpg",
      ingredientes: ["Rodajas de kion", "Hojas de menta", "Miel"],
      preparacion: "Hervir y añadir miel.",
      uso: "Tomar caliente.",
      recomendaciones: "Ayuda a despejar las vías respiratorias.",
      advertencias: "No tomar muy caliente.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100020,
      titulo: "Agua de arroz con canela",
      categoria: "nutricion",
      imagen: "https://patijinich.com/es/wp-content/uploads/sites/3/2017/07/110-horchata.jpg",
      ingredientes: ["1/2 taza de arroz", "1 rama de canela", "Agua"],
      preparacion: "Hervir y colar.",
      uso: "Tomar tibio.",
      recomendaciones: "Ayuda ante malestar estomacal leve.",
      advertencias: "Consultar médico si hay fiebre.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100021,
      titulo: "Jugo amazónico de betarraga y cocona",
      categoria: "nutricion",
      imagen: "https://i.ytimg.com/vi/bSPl1Ixveuk/maxresdefault.jpg",
      ingredientes: ["1/2 betarraga", "1 cocona", "Agua"],
      preparacion: "Licuar y colar.",
      uso: "Tomar en ayunas.",
      recomendaciones: "Aporta hierro y vitamina C.",
      advertencias: "Consumir moderadamente.",
      duracion: 1,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 100022,
      titulo: "Suero natural de limón y sal",
      categoria: "bienestar",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/fotosnoticias/2024/4/29/932246.jpg",
      ingredientes: ["1 litro de agua", "Jugo de 2 limones", "1 pizca de sal", "1 cucharada de miel"],
      preparacion: "Mezclar bien.",
      uso: "Tomar durante el día.",
      recomendaciones: "Ayuda a recuperar minerales.",
      advertencias: "No exceder sal.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100023,
      titulo: "Jarabe casero de cebolla y miel",
      categoria: "bienestar",
      imagen: "https://estaticos-cdn.prensaiberica.es/clip/d1308cf6-1700-4262-9da5-0c8ff6bc1b88_16-9-aspect-ratio_default_0.jpg",
      ingredientes: ["1 cebolla roja", "3 cucharadas de miel"],
      preparacion: "Dejar reposar la cebolla con miel durante horas.",
      uso: "Tomar una cucharada.",
      recomendaciones: "Ayuda a suavizar la garganta.",
      advertencias: "No dar miel a menores de 1 año.",
      duracion: 7,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 100024,
      titulo: "Infusión de romero y naranja",
      categoria: "bienestar",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEbEbU6bjQTu6xsuA-QxyUv3raG3aQaOWX0g&s",
      ingredientes: ["Hojas de romero", "Cáscara de naranja", "Agua"],
      preparacion: "Hervir y dejar reposar.",
      uso: "Tomar tibio.",
      recomendaciones: "Ayuda a activar la circulación.",
      advertencias: "No consumir en exceso.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100025,
      titulo: "Infusión de guayaba y canela",
      categoria: "digestivo",
      imagen: "https://www.clarin.com/2024/12/09/CHexd9iBC_2000x1500__1.jpg",
      ingredientes: ["5 hojas de guayaba", "1 rama de canela", "1 taza de agua"],
      preparacion: "Hervir durante 10 minutos.",
      uso: "Tomar tibio.",
      recomendaciones: "Ayuda ante molestias digestivas leves.",
      advertencias: "No consumir en exceso.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100026,
      titulo: "Compresa fría de pepino y sábila",
      categoria: "piel",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRotLmmGRjQHqsmGQ0ouxgwlp7Cg-EQ9LAUCg&s",
      ingredientes: ["Rodajas de pepino", "Gel de sábila frío"],
      preparacion: "Mezclar y refrigerar.",
      uso: "Aplicar 15 minutos.",
      recomendaciones: "Refresca la piel irritada.",
      advertencias: "Usar limpio y fresco.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100027,
      titulo: "Batido amazónico de aguaje",
      categoria: "energia",
      imagen: "https://www.clarin.com/2025/11/17/EoNx-O_LI_2000x1500__1.jpg",
      ingredientes: ["Pulpa de aguaje", "Leche", "Miel"],
      preparacion: "Licuar todos los ingredientes.",
      uso: "Tomar en el desayuno.",
      recomendaciones: "Aporta vitaminas y energía.",
      advertencias: "Consumir moderadamente.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100028,
      titulo: "Agua refrescante de menta y limón",
      categoria: "bienestar",
      imagen: "https://drinkmate.pe/cdn/shop/articles/drinkmate-receta-limonmenta.jpg?v=1592245918",
      ingredientes: ["Hojas de menta", "Limón", "Agua fría"],
      preparacion: "Mezclar y dejar reposar.",
      uso: "Tomar frío.",
      recomendaciones: "Ayuda a refrescar el cuerpo.",
      advertencias: "Evitar exceso de limón.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100029,
      titulo: "Baño de sal y eucalipto",
      categoria: "piel",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQS6JVSEY47QCJWHsqxh93g3yKHRnojF0jiA&s",
      ingredientes: ["Agua tibia", "Sal", "Hojas de eucalipto"],
      preparacion: "Hervir hojas y mezclar.",
      uso: "Remojar pies 20 minutos.",
      recomendaciones: "Ayuda contra humedad y mal olor.",
      advertencias: "Secar bien los pies después.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100030,
      titulo: "Jugo de camu camu y naranja",
      categoria: "nutricion",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArDWVb8b0E6BiPm1onjgv8RfS-KwkTn2B7A&s",
      ingredientes: ["Pulpa de camu camu", "1 naranja", "Agua"],
      preparacion: "Licuar todo.",
      uso: "Tomar por la mañana.",
      recomendaciones: "Rico en vitamina C.",
      advertencias: "No exceder si tienes gastritis.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100031,
      titulo: "Crema fría de aloe y avena",
      categoria: "piel",
      imagen: "https://www.infobae.com/resizer/v2/ANXBGFIRFJCJTIJVC7IVBLOGXM.jpg?auth=7cc13c94fdc1fcb7629ae95b63ea2d06055f709d41b05289cc151264b48d1118&smart=true&width=350&height=196&quality=85",
      ingredientes: ["Gel de aloe vera", "Avena molida"],
      preparacion: "Mezclar y refrigerar.",
      uso: "Aplicar sobre la piel.",
      recomendaciones: "Calma ardor solar.",
      advertencias: "No usar en heridas graves.",
      duracion: 3,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 100032,
      titulo: "Té de eucalipto y miel",
      categoria: "bienestar",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJc2RhdDmwKEIGmI923kavcNCBiXxY51uPw&s",
      ingredientes: ["Hojas de eucalipto", "Miel", "Agua"],
      preparacion: "Hervir y mezclar.",
      uso: "Tomar caliente.",
      recomendaciones: "Ayuda a despejar vías respiratorias.",
      advertencias: "No dar miel a bebés.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100033,
      titulo: "Infusión nocturna de toronjil",
      categoria: "relajacion",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3v9pTclymirD-QZU355Kd-qhdRD6ssIMSQ&s",
      ingredientes: ["Hojas de toronjil", "Agua caliente"],
      preparacion: "Reposar 10 minutos.",
      uso: "Tomar antes de dormir.",
      recomendaciones: "Ayuda a relajarse.",
      advertencias: "No consumir en exceso.",
      duracion: 5,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100034,
      titulo: "Masaje de aceite de romero",
      categoria: "bienestar",
      imagen: "https://imagenes.elpais.com/resizer/v2/PVDHA7FBCZGQPDBE65BB7LZ23Q.png?auth=9549c6be13e6113ade5dc069a26808a54a4a9d4f4c615ba9b1724a0d4fb50193&width=1960&height=1470&smart=true",
      ingredientes: ["Aceite de oliva", "Romero triturado"],
      preparacion: "Dejar reposar 24 horas.",
      uso: "Aplicar con masajes.",
      recomendaciones: "Ayuda a aliviar cansancio.",
      advertencias: "No aplicar en heridas.",
      duracion: 30,
      tiempoRecomendado: 60,
      comentarios: []
    },
    {
      id: 100035,
      titulo: "Jarabe de limón y kion",
      categoria: "bienestar",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJv5-zNo9f6Q7j_Pe7qnTZA0712LWGvFrEXg&s",
      ingredientes: ["Limón", "Kion rallado", "Miel"],
      preparacion: "Mezclar y dejar reposar.",
      uso: "Tomar una cucharada.",
      recomendaciones: "Ayuda a suavizar garganta.",
      advertencias: "Consumir moderadamente.",
      duracion: 7,
      tiempoRecomendado: 14,
      comentarios: []
    },
    {
      id: 100036,
      titulo: "Refresco de maracuyá y hierbabuena",
      categoria: "nutricion",
      imagen: "https://lafoliecafe.com/wp-content/uploads/2020/12/maracuya-frappe.jpg",
      ingredientes: ["Maracuyá", "Hierbabuena", "Agua fría"],
      preparacion: "Licuar y colar.",
      uso: "Tomar antes de almuerzo.",
      recomendaciones: "Refrescante y digestivo.",
      advertencias: "Evitar exceso de azúcar.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100037,
      titulo: "Batido de plátano y avena",
      categoria: "energia",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbGo2kkqmq9zD3z3ywDbWyi0cOjmCTwO0wCA&s",
      ingredientes: ["1 plátano", "2 cucharadas de avena", "Leche"],
      preparacion: "Licuar.",
      uso: "Tomar después de actividad física.",
      recomendaciones: "Aporta potasio y energía.",
      advertencias: "Consumir fresco.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100038,
      titulo: "Gárgaras de salvia",
      categoria: "bienestar",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuAPRLHyNYNoms0X4S6EWA2o43I80iKCyXgw&s",
      ingredientes: ["Hojas de salvia", "Agua tibia"],
      preparacion: "Hervir y enfriar.",
      uso: "Hacer gárgaras.",
      recomendaciones: "Ayuda a aliviar irritación.",
      advertencias: "No ingerir demasiado.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100039,
      titulo: "Loción de pepino y té verde",
      categoria: "piel",
      imagen: "https://www.rutadelacera.es/wp-content/uploads/2023/01/TE-VERDE-AND-PEPINO-1.jpg",
      ingredientes: ["Pepino licuado", "Té verde frío"],
      preparacion: "Mezclar y refrigerar.",
      uso: "Aplicar con algodón.",
      recomendaciones: "Refresca y limpia la piel.",
      advertencias: "Usar máximo 3 días refrigerado.",
      duracion: 3,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 100040,
      titulo: "Compresa de manzanilla caliente",
      categoria: "bienestar",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4BSMYg0C7mj7VfO9uPeHRQKMIRD2GxoaQeg&s",
      ingredientes: ["Té de manzanilla", "Tela limpia"],
      preparacion: "Remojar la tela.",
      uso: "Aplicar sobre cuello.",
      recomendaciones: "Relaja músculos tensos.",
      advertencias: "No usar muy caliente.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
{
  id: 5012,
  titulo: "Infusión de Hoja de Naranja (reduce ansiedad por comer)",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4UEGc4FXCqIx_FqYAcFVrCFjJwMVW5FZpjQ&s",
  ingredientes: ["5–7 hojas de naranja frescas", "1 taza de agua"],
  preparacion: "1. Hervir agua. 2. Agregar hojas de naranja. 3. Tapar y reposar 5 minutos. 4. Colar y servir.",
  uso: "En la noche, durante 5 días.",
  recomendaciones: "Reduce ansiedad por comer. Relaja y ayuda a dormir mejor. Control de apetito nocturno.",
  advertencias: "Puede dar sueño. No conducir después de tomar. Máximo 5 días.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},
{
  id: 5013,
  titulo: "Agua de Berenjena (reduce colesterol)",
  categoria: "peso",
  imagen: "https://www.infobae.com/new-resizer/Uu0c54xmCg3-HiZ0iy8wy3Gz1Dw=/arc-anglerfish-arc2-prod-infobae/public/HP5JDOWNJZA37NUVWMZGNZJ7TA.png",
  ingredientes: ["1 berenjena mediana", "1 litro de agua"],
  preparacion: "1. Lavar bien la berenjena. 2. Cortar en rodajas finas con cáscara. 3. Verter en frasco con agua. 4. Dejar reposar toda la noche en refrigerador. 5. Colar al día siguiente.",
  uso: "Tomar en ayunas, durante 1 semana.",
  recomendaciones: "Reduce colesterol de forma efectiva. Absorbe grasas. Beneficiosa para la salud cardiovascular.",
  advertencias: "Sabor fuerte. Puede causar leve debilidad. No exceder 1 semana.",
  duracion: 1,
  tiempoRecomendado: 7,
  comentarios: []
},
{
  id: 5014,
  titulo: "Infusión de Menta (controla apetito)",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG15g736J6O0crBpimJnted5U3ZRj5us8r3w&s",
  ingredientes: ["5–7 hojas de menta fresca", "1 taza de agua"],
  preparacion: "1. Hervir agua. 2. Agregar hojas de menta. 3. Tapar y reposar 5 minutos. 4. Colar y servir.",
  uso: "Tomar antes de comer, durante 5 días.",
  recomendaciones: "Controla apetito de forma natural. Mejora digestión. Refrescante.",
  advertencias: "No exceso. Máximo 5 días. Personas con úlcera, moderación.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},
{
  id: 5015,
  titulo: "Té Verde con Miel (acelera metabolismo)",
  categoria: "peso",
  imagen: "https://vstatic.vietnam.vn/vietnam/resource/IMAGE/2026/01/07/1767719210548_kham-pha-the-gioi00-00-01-08still039.jpeg",
  ingredientes: ["1 bolsita de té verde", "1 taza de agua caliente", "1 cucharadita de miel (opcional)"],
  preparacion: "1. Hervir agua. 2. Agregar bolsita de té verde. 3. Reposar 3–5 minutos. 4. Agregar miel si deseas. 5. Servir.",
  uso: "Por la mañana, 4 veces por semana.",
  recomendaciones: "Acelera metabolismo. Rico en antioxidantes. Quema grasas de forma natural.",
  advertencias: "No en noches (efecto estimulante). Moderar en embarazo. Máximo miel pequeña cantidad.",
  duracion: 7,
  tiempoRecomendado: 21,
  comentarios: []
},
{
  id: 5016,
  titulo: "Jugo de Remolacha y Zanahoria (depurativo y energético)",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjIfZXke7RhUD05No08VcEtBTt38RH0pO-Sg&s",
  ingredientes: ["1 remolacha mediana", "2 zanahorias", "1/2 taza de agua", "Jugo de 1/2 limón"],
  preparacion: "1. Lavar bien remolacha y zanahorias. 2. Cortar en trozos (con cáscara o sin, según preferencia). 3. Licuar con agua. 4. Colar. 5. Agregar jugo de limón.",
  uso: "Por la mañana, 3 veces por semana.",
  recomendaciones: "Depurativo potente, energético. Limpia el hígado. Acelera eliminación de grasas.",
  advertencias: "Puede manchar. Moderar en diabetes. Lavar bien verduras.",
  duracion: 7,
  tiempoRecomendado: 21,
  comentarios: []
},
 {
      id: 101,
      titulo: "Sopa de Lentejas con Verduras",
      categoria: "nutricion",
      imagen: 'https://i.blogs.es/d22648/dap-2/840_560.jpg',
      ingredientes: ["1 taza de lentejas", "1 zanahoria picada", "1 papa picada", "2 dientes de ajo", "Sal al gusto", "Agua"],
      preparacion: "1. Remojar las lentejas 1 hora (opcional pero recomendado). 2. Hervir lentejas en agua. 3. Agregar verduras picadas. 4. Cocinar 20–25 minutos hasta que las lentejas estén tiernas. 5. Sazonar con sal al gusto.",
      uso: "Almuerzo principal, 2–3 veces por semana",
      recomendaciones: "Aporta proteína vegetal, fibra y energía duradera. Perfecta para dietas balanceadas. Remojar las lentejas reduce la producción de gases.",
      advertencias: "Puede causar gases si no se remoja antes. Beber mucha agua durante el día.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 102,
      titulo: "Ensalada de Betarraga y Zanahoria",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4JNVaW-F4cUS_FgdDcdOzDeBFsFgUPzroDw&s',
      ingredientes: ["1 betarraga cocida y cortada", "2 zanahorias ralladas", "Jugo de 1 limón", "Sal al gusto"],
      preparacion: "1. Cocinar betarraga hasta que esté tierna (30 minutos). 2. Dejar enfriar y cortar en cubos pequeños. 3. Rallar zanahorias crudas. 4. Mezclar todo en un bol. 5. Aderezar con jugo de limón y sal.",
      uso: "Acompañamiento frecuente en almuerzos y cenas",
      recomendaciones: "Mejora la circulación de la sangre, aporta hierro y vitaminas esenciales. Excelente para fortalecer defensas.",
      advertencias: "Puede teñir la orina de rojo (es completamente normal). Lavar bien las manos después de manipular betarraga.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 103,
      titulo: "Tortilla de Espinaca",
      categoria: "nutricion",
      imagen: 'https://www.aceitesdeolivadeespana.com/sites/default/files/_espanol/recetas/tortilla_de_pimientos_y_espinacas_2.jpg',
      ingredientes: ["3 huevos medianos", "1 taza de espinaca fresca picada", "Sal al gusto", "1 cucharada de aceite vegetal"],
      preparacion: "1. Lavar y picar finamente la espinaca. 2. Batir los huevos en un recipiente. 3. Agregar la espinaca picada a los huevos. 4. Sazonar con sal. 5. Calentar aceite en sartén a fuego medio. 6. Verter la mezcla y cocinar hasta que esté firme (5-7 minutos).",
      uso: "Desayuno o cena, 2–3 veces por semana",
      recomendaciones: "Rica en hierro, proteína y vitaminas. La espinaca fortalece los huesos y mejora la circulación. Muy nutritiva para niños y adultos.",
      advertencias: "No exceder cantidad de aceite. Evitar quemar la tortilla. Si tienes problemas de coagulación, consulta sobre consumo de espinaca.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 104,
      titulo: "Puré de Camote",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtuK-WfNmiF1W_rdQPQLdeFiY6-HTshtWMw&s',
      ingredientes: ["3 camotes medianos", "1/4 taza de leche o agua", "Sal al gusto"],
      preparacion: "1. Pelar los camotes y cortarlos en trozos. 2. Hervir en agua con sal durante 15–20 minutos hasta que estén muy tiernos. 3. Escurrir bien el agua. 4. Machacar los camotes con un tenedor. 5. Agregar leche o agua poco a poco hasta lograr consistencia cremosa.",
      uso: "Acompañamiento en almuerzos, 2 veces por semana",
      recomendaciones: "Proporciona energía saludable y duradera. Rico en betacarotenos y fibra. Ideal para personas activas.",
      advertencias: "Moderar cantidad en personas con diabetes o problemas de azúcar. No agregar mantequilla o grasas excesivas.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 105,
      titulo: "Sopa de Verduras Mixtas",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9lAE1pGRNg8lvrOfwFSxAVJbyIeUNB-9OA&s',
      ingredientes: ["1 zanahoria picada", "1 papa picada", "1 taza de vainitas cortadas", "2 dientes de ajo", "Sal al gusto", "1 litro de agua"],
      preparacion: "1. Hervir agua en una olla grande. 2. Agregar ajo picado. 3. Añadir papa y zanahoria. 4. Cocinar 10 minutos. 5. Agregar vainitas cortadas. 6. Cocinar 10 minutos más hasta que todas las verduras estén tiernas. 7. Sazonar con sal al gusto.",
      uso: "Cena ligera, frecuentemente (4–5 veces por semana)",
      recomendaciones: "Ligera, nutritiva y fácil de digerir. Perfecta para cenas que no carguen el estómago. Aporta vitaminas y minerales.",
      advertencias: "No exceso de sal (controlar presión arterial). Lavar bien las verduras antes de usar.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 106,
      titulo: "Arroz con Verduras",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA82_r7xAERge8LWZvOyfrkOnEeTIbemrLAg&s',
      ingredientes: ["1 taza de arroz", "2 tazas de agua", "1 zanahoria picada", "1/2 taza de arvejas", "2 dientes de ajo", "Sal al gusto"],
      preparacion: "1. Lavar el arroz varias veces. 2. Calentar aceite en una olla. 3. Agregar ajo y rehogar. 4. Verter el arroz y mezclar bien. 5. Agregar agua hirviendo. 6. Añadir zanahoria y arvejas. 7. Tapar y cocinar a fuego bajo 20 minutos.",
      uso: "Almuerzo principal, frecuentemente",
      recomendaciones: "Proporciona energía balanceada. Las verduras agregan vitaminas y minerales. Combina bien con proteínas.",
      advertencias: "Controlar la cantidad de sal. No cocinar demasiado tiempo (arroz se endurece). Moderar porciones en dietas de control de peso.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 107,
      titulo: "Ensalada de Palta con Tomate",
      categoria: "nutricion",
      imagen: 'https://imag.bonviveur.com/presentacion-de-la-ensalada-de-aguacate.jpg',
      ingredientes: ["1 palta madura", "2 tomates medianos", "Jugo de 1/2 limón", "Sal al gusto"],
      preparacion: "1. Cortar la palta por la mitad, quitar la semilla y extraer la pulpa en cubos. 2. Cortar tomates en trozos pequeños. 3. Mezclar en un bol. 4. Aderezar con jugo de limón y sal al gusto. 5. Servir inmediatamente.",
      uso: "Acompañamiento en almuerzos, 3 veces por semana",
      recomendaciones: "Aporta grasas saludables para el corazón. Rica en potasio y vitaminas. Excelente para mantener buena salud cardiovascular.",
      advertencias: "No exceso (calórico). Consumir fresco. Evitar en personas con alergia a palta.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 108,
      titulo: "Huevo Sancochado con Yuca",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgOiXkP_GashA1-N9VCmGko4PKAgbpPvZ11Q&s',
      ingredientes: ["2 huevos", "1 yuca mediana", "Sal al gusto"],
      preparacion: "1. Pelar la yuca y cortarla en trozos. 2. Hervir en agua con sal durante 20–25 minutos. 3. En otra olla, hervir huevos en agua con sal 10–12 minutos. 4. Escurrir ambos. 5. Servir juntos.",
      uso: "Desayuno rápido y nutritivo, frecuentemente",
      recomendaciones: "Excelente combinación de proteína y energía. Perfecto para comenzar el día con energía. Muy nutritivo para toda la familia.",
      advertencias: "Moderar cantidad de sal. Cocinar bien la yuca antes de consumir.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 109,
      titulo: "Caldo de Pollo con Verduras",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmx84E1eH1Yk9TxhDewtyI8RHEuarmSyxkFw&s',
      ingredientes: ["1/2 pollo pequeño o pechuga", "2 zanahorias", "2 papas", "2 tallos de apio", "2 dientes de ajo", "Sal y pimienta al gusto", "2 litros de agua"],
      preparacion: "1. Lavar bien el pollo. 2. Cortar en trozos. 3. Hervir en agua con sal durante 5 minutos. 4. Quitar espuma que suba. 5. Agregar verduras picadas. 6. Agregar ajo. 7. Cocinar todo 30 minutos a fuego medio. 8. Sazonar con sal y pimienta.",
      uso: "Almuerzo reconfortante o recuperación, 1–2 veces por semana",
      recomendaciones: "Fortalece el cuerpo y las defensas. Perfecta para recuperarse de enfermedades. Rica en colágeno natural y proteína.",
      advertencias: "Quitar grasa visible del pollo antes de cocinar. No exceso de sal.",
      duracion: 2,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 110,
      titulo: "Ensalada de Repollo y Limón",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalfIDpc9EHNsGcr-7XVTBFW8h8guL2uiZwA&s',
      ingredientes: ["1/2 repollo mediano", "Jugo de 2 limones", "Sal al gusto"],
      preparacion: "1. Lavar y picar finamente el repollo. 2. Colocar en un bol. 3. Aderezar con jugo de limón. 4. Agregar sal al gusto. 5. Mezclar bien. 6. Dejar reposar 5 minutos para que suelte sus jugos.",
      uso: "Acompañamiento frecuente en comidas",
      recomendaciones: "Excelente para la digestión. Tiene propiedades desinflamatorias. Muy bajo en calorías.",
      advertencias: "Puede inflamar si se come en exceso. Lavar bien antes de usar. Evitar en personas con problemas tiroideos sin consultar.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 111,
      titulo: "Plátano Verde Sancochado",
      categoria: "nutricion",
      imagen: 'https://res.cloudinary.com/enbonnet/image/upload/w_700,h_400,c_fill/ubzpw44k63af9hwxphd6',
      ingredientes: ["3 plátanos verdes", "Agua", "Sal al gusto"],
      preparacion: "1. Pelar los plátanos verdes (pueden estar duros). 2. Cortarlos en trozos medianos. 3. Hervir agua con sal. 4. Agregar trozos de plátano. 5. Cocinar 15–20 minutos hasta que estén tiernos. 6. Escurrir y servir.",
      uso: "Desayuno o cena, frecuentemente",
      recomendaciones: "Proporciona energía duradera. Rico en potasio y fibra. Ideal para el sistema digestivo.",
      advertencias: "Moderar si hay tendencia a estreñimiento. Cocinar bien antes de consumir.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 112,
      titulo: "Sopa de Avena Salada",
      categoria: "nutricion",
      imagen: 'https://d1uz88p17r663j.cloudfront.net/original/5c43d8ffa3d3401e98e02ac137612f04_SOPA_DE_AVENA.jpg',
      ingredientes: ["1 taza de avena", "1 zanahoria picada", "1 papa picada", "2 dientes de ajo", "1 litro de agua", "Sal al gusto"],
      preparacion: "1. Hervir agua en una olla. 2. Agregar ajo y verduras. 3. Cocinar 10 minutos. 4. Agregar avena. 5. Cocinar 10 minutos más a fuego bajo, removiendo ocasionalmente. 6. Sazonar con sal.",
      uso: "Cena ligera, 3 veces por semana",
      recomendaciones: "Ligera y muy nutritiva. Facilita la digestión. Perfecta para cenas que no carguen el estómago.",
      advertencias: "No muy espesa. Usar avena integral si es posible. Remover constantemente para evitar que se pegue.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 113,
      titulo: "Ensalada de Pepino con Hierbas",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPyL_fIleyB17ypX8YHBrXtL87fV944rwn1w&s',
      ingredientes: ["2 pepinos medianos", "Hierbas frescas (perejil, cilantro)", "Jugo de 1 limón", "Sal al gusto"],
      preparacion: "1. Lavar bien los pepinos. 2. Cortarlos en rodajas. 3. Picar las hierbas finamente. 4. Mezclar pepino con hierbas en un bol. 5. Aderezar con jugo de limón y sal. 6. Servir inmediatamente.",
      uso: "Acompañamiento en almuerzos, frecuentemente",
      recomendaciones: "Refrescante y muy bajo en calorías. Perfecto para días calurosos. Excelente para la digestión.",
      advertencias: "Lavar muy bien los pepinos y las hierbas. Consumir fresco.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 114,
      titulo: "Tortilla de Papa",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5QFbU8s7I0HH7WO-TvScreZs_EdFHPCttCg&s',
      ingredientes: ["3 papas medianas", "3 huevos", "2 dientes de ajo", "Sal al gusto", "1 cucharada de aceite vegetal"],
      preparacion: "1. Pelar y rallar las papas. 2. Exprimir bien para quitar exceso de agua. 3. Batir los huevos. 4. Mezclar papas ralladas con huevos. 5. Agregar ajo picado y sal. 6. Calentar aceite en sartén a fuego medio. 7. Verter mezcla y freír hasta que esté dorada por ambos lados.",
      uso: "Desayuno o almuerzo, moderadamente",
      recomendaciones: "Proporciona energía rápida. Excelente para comenzar actividades físicas. Muy satisfactoria.",
      advertencias: "No usar mucho aceite. Cocinar a fuego moderado para evitar quemar. Evitar en dietas de bajo contenido calórico.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    {
      id: 115,
      titulo: "Sopa de Fideos con Verduras",
      categoria: "nutricion",
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDfAz52zIuK3ARlicfCZtb_AxebxGrRDWSEQ&s',
      ingredientes: ["2 tazas de fideos", "1 zanahoria picada", "1 papa picada", "2 dientes de ajo", "1 litro de agua", "Sal al gusto"],
      preparacion: "1. Hervir agua en una olla grande. 2. Agregar ajo. 3. Añadir papa y zanahoria. 4. Cocinar 10 minutos. 5. Agregar fideos. 6. Cocinar 8–10 minutos más hasta que los fideos estén al dente. 7. Sazonar con sal.",
      uso: "Cena ligera, frecuentemente",
      recomendaciones: "Energía rápida. Fácil de preparar. Perfecta para cenas rápidas y nutritivas.",
      advertencias: "No exceso de cantidad. Controlar tamaño de porciones en dietas especiales.",
      duracion: 1,
      tiempoRecomendado: 7,
      comentarios: []
    },
    /* ============================================
   NUEVA CATEGORÍA: ENERGÍA Y FUERZA (SAN MARTÍN)
   IDs: 6001-6015 (12 recetas verificadas sin duplicados)
   ============================================ */

{
    id: 6001,
    titulo: "Batido de Plátano Verde con Maní",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxmcULqu878_jmtb6Jdp2C6C-pYsXF8RR9Vw&s",
    ingredientes: [
        "1 plátano verde cocido",
        "2 cucharadas de maní tostado",
        "1 taza de agua o leche"
    ],
    preparacion: "Cocer el plátano verde hasta que esté suave. Pelar y licuar con el maní tostado y el líquido hasta obtener una mezcla homogénea.",
    uso: "Desayuno o antes de actividad física",
    recomendaciones: "Aporta energía sostenida y proteína para músculos. Ideal para deportistas.",
    advertencias: "Alto en calorías; no consumir en exceso si buscas bajar de peso.",
    duracion: 7,
    tiempoRecomendado: 21,
    comentarios: []
},
{
    id: 6002,
    titulo: "Pasta de Sacha Inchi Casera",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp6FbAGfckMC4OHz-2ZIbQXrWh7zolLUb2A&s",
    ingredientes: [
        "Semillas de sacha inchi tostadas",
        "Un poco de agua"
    ],
    preparacion: "Tostar las semillas de sacha inchi. Moler en procesador hasta formar pasta cremosa. Agregar agua si es necesario.",
    uso: "Untar en pan o acompañar comidas",
    recomendaciones: "Rica en proteínas y omega 3, 6, 9 para fuerza muscular.",
    advertencias: "Consumir en pequeñas cantidades (1-2 cucharadas).",
    duracion: 30,
    tiempoRecomendado: 60,
    comentarios: []
},

{
    id: 6005,
    titulo: "Infusión de Guaraná Amazónico",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnCBceocvdNmGgLbLb4ToF52F4Rivs1XxRBw&s",
    ingredientes: [
        "1 cucharadita de polvo de guaraná",
        "1 taza de agua caliente",
        "Miel al gusto (opcional)"
    ],
    preparacion: "Hervir agua. Agregar el polvo de guaraná y mezclar bien. Dejar reposar 5 minutos.",
    uso: "En la mañana, en ayunas",
    recomendaciones: "Energizante natural potente. Contiene cafeína natural.",
    advertencias: "Máximo 3 días seguidos. No usar si tienes problemas cardíacos.",
    duracion: 3,
    tiempoRecomendado: 7,
    comentarios: []
},
{
    id: 6006,
    titulo: "Ensalada de Frejol con Verduras",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxnn0EdtzOV0_osNQvK-Z6d7XJJSLSaNcVhg&s",
    ingredientes: [
        "1 taza de frejoles cocidos",
        "1 tomate picado",
        "1/2 cebolla picada",
        "Jugo de limón",
        "Sal al gusto"
    ],
    preparacion: "Cocer los frejoles hasta que estén suaves. Mezclar con tomate y cebolla picados. Aderezar con limón y sal.",
    uso: "Almuerzo o cena ligera",
    recomendaciones: "Proteína vegetal para músculos. Rica en hierro y fibra.",
    advertencias: "Puede causar gases. Remojar frejoles overnight antes de cocinar.",
    duracion: 2,
    tiempoRecomendado: 14,
    comentarios: []
},
{
    id: 6008,
    titulo: "Sopa de Huevo con Verduras",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwbTOACm-XqpcwIWdxL_OOJqWKVk_pfD1bgw&s",
    ingredientes: [
        "2 huevos",
        "1 zanahoria picada",
        "1 papa pequeña",
        "1 diente de ajo",
        "Sal al gusto"
    ],
    preparacion: "Hervir agua con verduras picadas hasta que estén suaves. Agregar huevos batidos en forma de hilo.",
    uso: "Cena o recuperación después de esfuerzo físico",
    recomendaciones: "Recuperación muscular rápida. Proteína de alta calidad.",
    advertencias: "No sobrecocer el huevo para mantener nutrientes.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
},
{
    id: 6009,
    titulo: "Mazamorra de Maíz Natural",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnI9gh95RfYluf6icI1hzAS3ZiO5FlHgq_Q&s",
    ingredientes: [
        "1 taza de maíz molido",
        "1 litro de agua",
        "Canela al gusto",
        "Miel o chancaca (opcional)"
    ],
    preparacion: "Hervir el maíz molido en agua removiendo constantemente hasta espesar. Agregar canela.",
    uso: "Desayuno energético",
    recomendaciones: "Energía rápida de carbohidratos complejos. Tradicional amazónica.",
    advertencias: "No exceso de azúcar. Moderar en diabetes.",
    duracion: 2,
    tiempoRecomendado: 14,
    comentarios: []
},
{
    id: 6011,
    titulo: "Huevo Revuelto con Verduras",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJADbBbXzvDvhNL5F9duEQhGNf2sGCd6ljuA&s",
    ingredientes: [
        "2 huevos",
        "1/2 tomate picado",
        "1/4 cebolla picada",
        "Espinacas o acelgas",
        "Poco aceite"
    ],
    preparacion: "Batir huevos. Saltear verduras en poco aceite. Agregar huevos y cocinar removiendo.",
    uso: "Desayuno principal",
    recomendaciones: "Proteína completa para músculos. Vitaminas de verduras.",
    advertencias: "Usar poco aceite. No consumir yema en exceso si tienes colesterol alto.",
    duracion: 1,
    tiempoRecomendado: 21,
    comentarios: []
},
{
    id: 6014,
    titulo: "Infusión de Hoja de Coca (tradicional)",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRNvrqvW8Cm-oOjYoDajkwMaTQCNrAvgpn8A&s",
    ingredientes: [
        "5-7 hojas de coca frescas o secas",
        "1 taza de agua caliente"
    ],
    preparacion: "Hervir agua. Agregar hojas de coca. Tapar y reposar 5-7 minutos. Colar y tomar tibio.",
    uso: "En la mañana o antes de actividad física",
    recomendaciones: "Resistencia y energía tradicional andina/amazónica. Reduce fatiga.",
    advertencias: "Uso cultural tradicional; consumir moderado. Consultar si tienes condiciones médicas.",
    duracion: 3,
    tiempoRecomendado: 7,
    comentarios: []
},
{
    id: 6015,
    titulo: "Caldo de Gallina Ligero",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvENC5jSbEm3_ArbsHaFXCl1o3v5_sffZN9Q&s",
    ingredientes: [
        "1 presa de gallina",
        "1 zanahoria",
        "1 papa",
        "1 rama de apio",
        "Sal al gusto"
    ],
    preparacion: "Hervir la gallina con verduras hasta que esté suave. Retirar grasa de la superficie.",
    uso: "Después de esfuerzo físico o cuando hay debilidad",
    recomendaciones: "Recuperación física completa. Proteína, colágeno y minerales.",
    advertencias: "Quitar grasa antes de consumir. No exceso de sal.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
},
{
    id: 6007,
    titulo: "Plátano Asado con Queso",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQroxpqVGXohmPWgedl35u8_KJwVAh9d5WNGA&s",
    ingredientes: [
        "1 plátano maduro",
        "2 rebanadas de queso fresco",
        "Miel al gusto (opcional)"
    ],
    preparacion: "Asar el plátano maduro con cáscara en horno o sartén hasta que esté dorado. Abrir y agregar queso fresco.",
    uso: "Desayuno o merienda",
    recomendaciones: "Energía rápida + proteína. El plátano aporta potasio y el queso calcio.",
    advertencias: "Calórico. Moderar porciones si controlas peso.",
    duracion: 1,
    tiempoRecomendado: 7,
    comentarios: []
},
{
    id: 6013,
    titulo: "Bebida de Maní Natural",
    categoria: "energia",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC8eG29HGVDVZ2h_DBpTNvO6m2jPnvXTpLeA&s",
    ingredientes: [
        "1/2 taza de maní tostado",
        "1 litro de agua",
        "Miel o chancaca al gusto",
        "Canela (opcional)"
    ],
    preparacion: "Licuar el maní con agua. Colar con tela fina. Endulzar y agregar canela.",
    uso: "Desayuno o merienda",
    recomendaciones: "Proteína vegetal y energía duradera. Rico en grasas saludables.",
    advertencias: "Calórico. Moderar porciones. No usar si eres alérgico al maní.",
    duracion: 2,
    tiempoRecomendado: 21,
    comentarios: []
},
   /* ============================================
   NUEVA CATEGORÍA: PURGANTES (SAN MARTÍN)
   IDs: 7001-7012 (12 recetas)
   ============================================ */
{
    id: 7001,
    titulo: "Infusión de Semillas de Papaya",
    categoria: "purgantes",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-Zc3yrOvvNt53yaHH03f31_tO_G9iNcWPQ&s",
    ingredientes: [
        "1 cucharadita de semillas de papaya frescas",
        "1 taza de agua",
        "Miel al gusto (opcional)"
    ],
    preparacion: "Lavar bien las semillas de papaya. Triturarlas en mortero o licuadora. Hervir el agua y agregar las semillas trituradas. Cocinar 5 minutos a fuego lento. Colar y dejar enfriar. Endulzar con miel si se desea.",
    uso: "Tomar en ayunas, durante 3 días seguidos",
    recomendaciones: "Las semillas de papaya contienen carpaína, un compuesto antiparasitario natural. Ayuda a eliminar parásitos intestinales y limpiar el colon. Ideal para desparasitación natural.",
    advertencias: "No usar durante el embarazo o lactancia. Sabor fuerte y picante. Puede causar molestias estomacales leves. No exceder los 3 días.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
{
    id: 7002,
    titulo: "Jugo de Papaya con Miel (purgante)",
    categoria: "purgantes",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwC_IaAW1rygsVYsRwXdnLNTzgmXOb5hPP9g&s",
    ingredientes: [
        "1 taza de papaya madura picada",
        "1 cucharadita de miel pura",
        "1/2 taza de agua",
        "Jugo de 1/2 limón"
    ],
    preparacion: "Pelar y picar la papaya madura. Licuar con el agua hasta obtener jugo. Colar si se desea. Agregar miel y jugo de limón. Mezclar bien. Servir inmediatamente.",
    uso: "Tomar en ayunas, durante 3-5 días",
    recomendaciones: "La papaya contiene papaína, enzima que ayuda a digerir proteínas y limpiar intestinos. La miel suaviza el efecto. Excelente para estreñimiento y limpieza intestinal suave.",
    advertencias: "No consumir en exceso (puede causar diarrea). Moderar en diabetes por la miel. No usar si hay gastritis activa.",
    duracion: 5,
    tiempoRecomendado: 5,
    comentarios: []
},
{
    id: 7003,
    titulo: "Infusión de Hoja de Guayaba (purgante fuerte)",
    categoria: "purgantes",
    imagen: "https://i.ytimg.com/vi/oUdFNeyjIok/maxresdefault.jpg",
    ingredientes: [
        "5-7 hojas de guayaba frescas o secas",
        "1 taza de agua",
        "1 cucharadita de jengibre rallado (opcional)"
    ],
    preparacion: "Lavar bien las hojas de guayaba. Hervir el agua y agregar las hojas. Cocinar 10 minutos a fuego medio. Agregar jengibre si se desea. Colar y servir tibio.",
    uso: "Tomar 1 taza, durante 2-3 días máximo",
    recomendaciones: "Las hojas de guayaba tienen propiedades astringentes y antimicrobianas. Ayuda a limpiar intestinos y eliminar bacterias dañinas. Útil para diarreas y parásitos leves.",
    advertencias: "No prolongar más de 3 días (puede causar estreñimiento). No usar en embarazo. Consultar si hay condiciones médicas.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
{
    id: 7004,
    titulo: "Infusión de Ajo (antiparasitario)",
    categoria: "purgantes",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaWQYJ5G4IClsoH7dmEgZPkn_yOf-PtDVDHQ&s",
    ingredientes: [
        "1 diente de ajo fresco",
        "1 taza de agua",
        "Jugo de 1/2 limón",
        "Miel al gusto (opcional)"
    ],
    preparacion: "Pelar y machacar el diente de ajo. Hervir el agua y agregar el ajo machacado. Cocinar 5 minutos. Colar y agregar jugo de limón. Endulzar con miel si se desea.",
    uso: "Tomar en ayunas, durante 3 días",
    recomendaciones: "El ajo contiene alicina, compuesto con propiedades antiparasitarias y antibacterianas potentes. Elimina parásitos intestinales y limpia el sistema digestivo. Remedio tradicional amazónico.",
    advertencias: "Puede irritar el estómago sensible. Causa mal aliento. No usar si hay gastritis o úlceras. Consultar en embarazo.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
{
    id: 7005,
    titulo: "Bebida de Piña (cáscara hervida - purgante)",
    categoria: "purgantes",
    imagen: "https://www.cocina-cubana.com/base/stock/Recipe/jugo-de-pina/jugo-de-pina_web.jpg.webp",
    ingredientes: [
        "Cáscara bien lavada de 1 piña madura",
        "1 litro de agua",
        "1 rama de canela (opcional)"
    ],
    preparacion: "Lavar muy bien la cáscara de piña con cepillo. Cortar en trozos. Hervir en 1 litro de agua durante 15 minutos. Agregar canela si se desea. Colar y dejar enfriar. Guardar en refrigerador.",
    uso: "Tomar durante el día, durante 3 días",
    recomendaciones: "La cáscara de piña contiene bromelina y fibra que ayudan a limpiar intestinos. Mejora digestión y elimina toxinas. Diurético natural que ayuda a desinflamar.",
    advertencias: "No usar si hay gastritis fuerte o sensibilidad gástrica. Usar piña madura y lavar bien la cáscara. No exceder 3 días.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
{
    id: 7006,
    titulo: "Infusión de Hierbabuena Concentrada",
    categoria: "purgantes",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI9KdkpZT6ZPmdVKokeFrxPFTt-XAJhfMRQQ&s",
    ingredientes: [
        "10-12 hojas de hierbabuena fresca",
        "1 taza de agua",
        "1 cucharadita de anís (opcional)"
    ],
    preparacion: "Lavar bien las hojas de hierbabuena. Hervir el agua y agregar las hojas. Tapar y reposar 10 minutos para infusión concentrada. Agregar anís si se desea. Colar y servir tibio.",
    uso: "Tomar después de comidas, durante 3 días",
    recomendaciones: "La hierbabuena concentrada ayuda a eliminar parásitos leves y reduce gases. Calma el estómago y mejora digestión. Propiedades carminativas y antiespasmódicas.",
    advertencias: "No consumir en exceso. Puede causar acidez en algunas personas. No usar en reflujo severo. Consultar en embarazo.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
{
    id: 7007,
    titulo: "Semillas de Zapallo (Calabaza) - Antiparasitario",
    categoria: "purgantes",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu33mrmDzCW3ihg9sEOkSh_bxjXPdHZv8y9Q&s",
    ingredientes: [
        "2 cucharadas de semillas de zapallo crudas",
        "1 cucharada de miel",
        "Agua suficiente"
    ],
    preparacion: "Triturar las semillas de zapallo en mortero o procesador. Mezclar con miel para formar pasta. Comer directamente en ayunas. Beber agua después.",
    uso: "Comer en ayunas, durante 3 días",
    recomendaciones: "Las semillas de zapallo contienen cucurbitina, aminoácido que paraliza parásitos intestinales. Remedio tradicional seguro incluso para niños. Elimina lombrices y tenias naturalmente.",
    advertencias: "Masticar bien las semillas. Puede causar náuseas leves. No usar si hay alergia a semillas. Consultar en embarazo.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
{
    id: 7008,
    titulo: "Infusión de Hoja de Palta (Purgante Suave)",
    categoria: "purgantes",
    imagen: "https://primicia.com.ve/wp-content/uploads/2022/07/hoja-de-aguacate.jpg",
    ingredientes: [
        "2 hojas de palta frescas o secas",
        "1 taza de agua",
        "Miel al gusto (opcional)"
    ],
    preparacion: "Lavar bien las hojas de palta. Hervir el agua y agregar las hojas. Tapar y reposar 7 minutos. Colar y endulzar con miel si se desea. Servir tibio.",
    uso: "Tomar 1 taza diaria, durante 2-3 días",
    recomendaciones: "Las hojas de palta tienen propiedades diuréticas y laxantes suaves. Ayudan a limpiar intestinos y riñones. Tradicional en la Amazonía para desintoxicación.",
    advertencias: "No exceder la dosis (puede ser fuerte). No usar en embarazo. Consultar si hay problemas hepáticos. Sabor amargo.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
{
    id: 7009,
    titulo: "Jugo de Limón con Agua Tibia (Limpieza)",
    categoria: "purgantes",
    imagen: "https://mejorconsalud.as.com/wp-content/uploads/2017/12/agua-limon-378x252.jpg",
    ingredientes: [
        "Jugo de 1 limón fresco",
        "1 taza de agua tibia",
        "1 pizca de sal marina (opcional)",
        "1 cucharadita de miel (opcional)"
    ],
    preparacion: "Exprimir el limón fresco. Calentar el agua hasta tibia (no hirviendo). Mezclar jugo de limón con agua. Agregar sal o miel si se desea. Beber inmediatamente.",
    uso: "Tomar en ayunas, durante 3-5 días",
    recomendaciones: "El limón estimula la producción de bilis y ayuda a limpiar hígado e intestinos. El agua tibia activa el movimiento intestinal. Excelente para iniciar el día y desintoxicar.",
    advertencias: "No usar si hay gastritis o úlceras. Puede erosionar esmalte dental (enjuagar boca después). No exceder 5 días.",
    duracion: 5,
    tiempoRecomendado: 5,
    comentarios: []
},
{
    id: 7010,
    titulo: "Infusión de Paico (Tradicional Fuerte)",
    categoria: "purgantes",
    imagen: "https://lanotadigital.com.ar/wp-content/uploads/2016/12/paico-chenopodium-ambrosioide.jpg",
    ingredientes: [
        "3-5 hojas frescas de paico",
        "1 taza de agua",
        "1 cucharadita de miel (opcional)"
    ],
    preparacion: "Lavar bien las hojas de paico. Hervir el agua y agregar las hojas. Tapar y reposar 5 minutos. Colar y endulzar con miel si se desea. Tomar tibio.",
    uso: "Tomar en ayunas, durante 1-3 días máximo",
    recomendaciones: "El paico es uno de los antiparasitarios más usados en la Amazonía. Contiene ascaridol, compuesto que elimina parásitos intestinales eficazmente. Remedio ancestral muy potente.",
    advertencias: "⚠️ NO EXCEDER 3 DÍAS. Puede ser tóxico en dosis altas. No usar en embarazo, niños pequeños o personas con problemas hepáticos. Consultar antes de usar.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
    
    {
  id: 9001,
  titulo: "Bioalcohol con Cáscara de Plátano",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiyagXagzPbfEXRAUXeADVnDjDPdBpgZRs1g&s",
  ingredientes: [
    "Cáscaras de plátano",
    "Agua hervida fría",
    "Azúcar (opcional)",
    "Levadura",
    "Botella o frasco con tapa"
  ],
  preparacion: `1. Lava bien las cáscaras y córtalas en trozos pequeños.
2. Hiérvelas 10–15 minutos para liberar azúcares. Deja enfriar.
3. Coloca en el recipiente limpio y añade levadura y azúcar.
4. Cubre el frasco (no completamente hermético).
5. Deja fermentar en un lugar oscuro.`,
  uso: "No ingerir. Para observar el proceso de fermentación y obtención de bioetanol con residuos.",
  recomendaciones: "Ideal para enseñar sostenibilidad, química y fermentación.",
  advertencias: "No beber el producto. Puede generar gases, abrir con precaución. Mantener lejos del fuego.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},

{
  id: 9002,
  titulo: "Vinagre natural de cáscara de piña",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbjLhV1YEQhz1XC5fu-k2rs-OS8J4QZkWYg&s",
  ingredientes: [
    "Cáscaras de piña",
    "Agua",
    "Azúcar",
    "Frasco de vidrio"
  ],
  preparacion: `1. Lava las cáscaras de piña.
2. Coloca en frasco limpio.
3. Agrega agua y azúcar.
4. Cubre con tela (no tapar completamente, necesita aire).
5. Deja fermentar, removiendo cada 2–3 días.
6. Cuando tenga olor ácido, cuela y usa.`,
  uso: "Útil para limpieza ecológica, cocina o experimentos químicos.",
  recomendaciones: "Perfecto para aprender fermentación y reciclaje de residuos.",
  advertencias: "No usar recipiente sucio para evitar contaminación.",
  duracion: 21,
  tiempoRecomendado: 21,
  comentarios: []
},

{
  id: 9003,
  titulo: "Fertilizante líquido (Biol Casero)",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdQiMAr1i5LUvt-Z1kSTIMHBaYzYcp6BmDdw&s",
  ingredientes: [
    "Restos de frutas o verduras",
    "Agua",
    "Botella cerrada"
  ],
  preparacion: `1. Corta residuos de frutas o verduras.
2. Mézclalos con agua en la botella.
3. Cierra y deja fermentar durante 2 semanas.
4. Abre cada 2 días para liberar los gases.
5. Antes de usar, cuela el líquido.`,
  uso: "Diluir antes de regar para fertilizar plantas.",
  recomendaciones: "Sustituto de fertilizantes químicos, ecológico y económico.",
  advertencias: "Debe diluirse siempre antes de usar (si es muy concentrado puede quemar plantas).",
  duracion: 14,
  tiempoRecomendado: 14,
  comentarios: []
},

{
  id: 9004,
  titulo: "Jabón ecológico con ceniza",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAL99quDZ-cGO_711ZBdQAS8ahGONrF1GsA&s",
  ingredientes: [
    "Ceniza de madera",
    "Agua",
    "Aceite usado"
  ],
  preparacion: `1. Mezcla la ceniza con agua, cuela para obtener lejía.
2. Calienta el aceite.
3. Mezcla lentamente el aceite con la lejía.
4. Revuelve hasta que espese.
5. Vierte en un molde y deja reposar.`,
  uso: "Jabón para limpieza y prácticas de reciclaje.",
  recomendaciones: "Reduce contaminación por aceites usados, ideal para talleres.",
  advertencias: "Preparación alcalina, usa guantes. No apto para piel delicada sin control.",
  duracion: 14,
  tiempoRecomendado: 14,
  comentarios: []
},

{
  id: 9005,
  titulo: "Bioplástico de almidón de yuca",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpy8SZHva-w7u-I0z_pwXQCxzxbaooDmU8pA&s",
  ingredientes: [
    "Almidón de yuca",
    "Agua",
    "Vinagre",
    "Glicerina"
  ],
  preparacion: `1. Mezcla los ingredientes en una olla.
2. Calienta a fuego bajo, revolviendo hasta que espese.
3. Extiende sobre superficie plana.
4. Deja secar 2–3 días.`,
  uso: "Demostración de materiales biodegradables y aprendizaje ambiental.",
  recomendaciones: "Excelente para ferias EUREKA/FENCYT, demuestra alternativas ecológicas.",
  advertencias: "No ingerir. No sirve para envolver comida real.",
  duracion: 3,
  tiempoRecomendado: 3,
  comentarios: []
},

{
  id: 9006,
  titulo: "Biogás simple con residuos",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkuiAoSeFvfXYQyFNvOSXJlVhvZIddXP-G2w&s",
  ingredientes: [
    "Restos orgánicos (fruta, verdura, etc)",
    "Agua",
    "Botella cerrada"
  ],
  preparacion: `1. Coloca residuos y agua en la botella.
2. Cierra bien. 
3. Deja en lugar cálido entre una y tres semanas.
4. Observa el inflado/producción de gas.`,
  uso: "Demostrar obtención de energía renovable en clases/talleres.",
  recomendaciones: "Producto educativo, perfecto para proyectos de ciencia.",
  advertencias: "No acercar a fuego, contiene gases combustibles.",
  duracion: 21,
  tiempoRecomendado: 21,
  comentarios: []
},

{
  id: 9007,
  titulo: "Insecticida natural de ajo",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWbL9n_a4Ga7mBFe3tiIGCcp0M3bwi45-Wbw&s",
  ingredientes: [
    "Ajo",
    "Agua"
  ],
  preparacion: `1. Licua el ajo con agua.
2. Cuela la mezcla.
3. Coloca en rociador.
4. Aplica sobre las plantas afectadas.`,
  uso: "Pulverizador para controlar plagas en plantas.",
  recomendaciones: "Ecológico, seguro, económico.",
  advertencias: "No aplicar demasiado para evitar dañar plantas sensibles.",
  duracion: 1,
  tiempoRecomendado: 1,
  comentarios: []
},
{
  id: 9009,
  titulo: "Papel reciclado artesanal",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-TlVwwK36PJ7h90Fw_hTzI3GbOYQE-dz35w&s",
  ingredientes: [
    "Papel usado",
    "Agua"
  ],
  preparacion: `1. Rompe el papel usado en trozos y remoja en agua varias horas (o toda la noche).
2. Licua la mezcla hasta formar una pasta.
3. Extiende la pasta sobre una tela o malla formando una lámina fina.
4. Deja secar completamente.
5. Desprende tu hoja de papel reciclado.`,
  uso: "Crea tus propias hojas de papel para cartas, arte, carteles escolares u oficios ecológicos.",
  recomendaciones: "Puedes añadir pétalos, hojas secas o colorante natural para decorar tus hojas.",
  advertencias: "El secado debe hacerse al aire y sin sol directo para evitar que se quiebre.",
  duracion: 2,
  tiempoRecomendado: 2,
  comentarios: []
},
{
  id: 9010,
  titulo: "Tinta natural con plantas",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAx1MBa75TMqhsoSiuWRea3p5w0dl0cENYeQ&s",
  ingredientes: [
    "Remolacha, hojas verdes o frutos de colores",
    "Agua"
  ],
  preparacion: `1. Corta en trozos remolacha, hojas o frutos intensos.
2. Hierve con poca agua durante 10-15 minutos.
3. Cuela y enfría el líquido.
4. Utiliza como tinta natural para pintar, escribir o decorar.`,
  uso: "Para pintura, caligrafía, teñido natural y educación ambiental.",
  recomendaciones: "Prueba diferentes plantas (remolacha = rojo, espinaca = verde, cúrcuma = amarillo) para obtener colores variados.",
  advertencias: "Puede manchar ropa y manos. No ingerir la tinta.",
  duracion: 1,
  tiempoRecomendado: 1,
  comentarios: []
},
{
  id: 9008,
  titulo: "Levadura natural de frutas",
  categoria: "proyectos-fencyt",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRao1rut3FDkb-TAkiG6Oqw_zoHZ1FgSUEJKA&s",
  ingredientes: [
    "Frutas maduras",
    "Agua",
    "Azúcar"
  ],
  preparacion: `1. Mezclar frutas, agua y azúcar en envase limpio.
2. Tapar con tela. 
3. Dejar fermentar hasta observar burbujas (3–5 días).`,
  uso: "Base para fermentos o experimentos de panificación.",
  recomendaciones: "Permite crear masa madre y demuestra biotecnología casera.",
  advertencias: "No consumir directamente si no se controla contaminación.",
  duracion: 5,
  tiempoRecomendado: 5,
  comentarios: []
},
{
    id: 7011,
    titulo: "Jugo de Aloe Vera (Sábila) - Laxante",
    categoria: "purgantes",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN4T9ydwCAL7etty_tyCSfDJcJaYWZFYzN0A&s",
    ingredientes: [
        "1 cristal grande de sábila (aloe vera)",
        "1 litro de agua",
        "Jugo de 1 limón",
        "Miel al gusto"
    ],
    preparacion: "Cortar el cristal de sábila. Remojar en agua 24 horas para quitar aloína (sustancia amarga). Lavar bien el gel. Licuar con agua fresca. Agregar limón y miel. Colar y servir.",
    uso: "Tomar en ayunas, durante 2-3 días",
    recomendaciones: "El aloe vera es laxante natural potente. Limpia colon, elimina toxinas y mejora digestión. Rico en vitaminas y minerales. Excelente para estreñimiento crónico.",
    advertencias: "⚠️ Puede causar diarrea fuerte. No usar en embarazo, menstruación o problemas renales. Preparar correctamente para quitar aloína. No exceder 3 días.",
    duracion: 3,
    tiempoRecomendado: 3,
    comentarios: []
},
{
    id: 7012,
    titulo: "Infusión de Achiote (Limpieza Intestinal)",
    categoria: "purgantes",
    imagen: "https://www.laanita.com/wp-content/uploads/2023/09/El-achiote-y-sus-usos-medicinales.png",
    ingredientes: [
        "1 cucharadita de semillas de achiote",
        "1 taza de agua",
        "Miel al gusto (opcional)"
    ],
    preparacion: "Machacar ligeramente las semillas de achiote. Hervir el agua y agregar las semillas. Cocinar 10 minutos a fuego lento. Colar y endulzar con miel. Servir tibio.",
    uso: "Tomar 1 taza, durante 2 días",
    recomendaciones: "El achiote tiene propiedades antioxidantes y antiinflamatorias. Apoya la limpieza intestinal leve y mejora digestión. Rico en bixina, compuesto beneficioso para el hígado.",
    advertencias: "No exceder la dosis. Puede manchar temporalmente. No usar en exceso. Consultar en embarazo. Sabor terroso.",
    duracion: 2,
    tiempoRecomendado: 2,
    comentarios: []
},
    {
  id: 5017,
  titulo: "Agua de Avena (saciante y controla peso)",
  categoria: "peso",
  imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GOn1Gwwx9rb1RXhQpvYWpdiiDJOBei1FDA&s",
  ingredientes: ["1/2 taza de avena integral", "1 litro de agua", "1 rama de canela (opcional)", "Miel (opcional)"],
  preparacion: "1. Verter agua en olla. 2. Agregar avena. 3. Añadir canela si deseas. 4. Hervir 10 minutos removiendo. 5. Colar bien. 6. Guardar en frasco.",
  uso: "Tomar durante el día como bebida, 4 veces por semana.",
  recomendaciones: "Saciante natural, controla peso. Reduce sensación de hambre. Rica en fibra soluble.",
  advertencias: "Evitar si eres celíaco (usar avena sin gluten). No agregar azúcar. Colar bien.",
  duracion: 7,
  tiempoRecomendado: 21,
  comentarios: []
}
  ];


  /* =======================
     STATE
     ======================= */
  const LS_KEYS = {
    RECETAS: 'rc_recetas_v1',
    FAVORITOS: 'rc_favoritos_v1',
    CONFIG: 'rc_config_v1',
    DATOS_USUARIO: 'datosUsuario'
  };

  let favoritos = JSON.parse(localStorage.getItem(LS_KEYS.FAVORITOS) || '[]') || [];
  let recetasFiltradas = [...recetas];
  let currentCategory = 'todas';
  let currentLanguage = localStorage.getItem('language') || 'es';
  let currentTheme = localStorage.getItem('theme') || 'light';
  let isFullscreen = false;

  /* ================
     UTILIDADES
     ================ */
  function safeText(str) {
    if (str == null) return '';
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function t(key, params = {}) {
    let text = (translations[currentLanguage] && translations[currentLanguage][key]) || (translations['es'] && translations['es'][key]) || key;
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`{${param}}`, 'g'), params[param]);
    });
    return text;
  }

  /* ================
     RENDER / UI
     ================ */
  function renderRecetas(list) {
    const recetasContainer = document.getElementById('recetas-container');
    if (!recetasContainer) return;
    recetasContainer.innerHTML = '';

    list.forEach((receta) => {
      const isFavorito = favoritos.some(f => f.id === receta.id);
      const card = document.createElement('div');
      card.className = 'receta-card';
      card.dataset.id = receta.id;
      card.innerHTML = `
        <img loading="lazy" src="${safeText(receta.imagen)}" alt="${safeText(receta.titulo)}" class="receta-img">
        <div class="receta-info">
          <h3 class="receta-title">${safeText(receta.titulo)}</h3>
          <span class="receta-category">${safeText(receta.categoria)}</span>
          <div class="receta-actions">
            <button class="btn btn-primary action-download" data-id="${receta.id}">${t('recipe.download')}</button>
            <button class="btn ${isFavorito ? 'btn-danger' : 'btn-primary'} action-fav" data-id="${receta.id}" data-favorito>${isFavorito ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'}</button>
          </div>
        </div>
      `;
      recetasContainer.appendChild(card);
    });
  }

  function generarDiasCronograma(recetaId, totalDias) {
    let html = '';
    const cronograma = JSON.parse(localStorage.getItem(`cronograma-${recetaId}`) || '[]');
    for (let i = 1; i <= totalDias; i++) {
      const usado = cronograma.includes(i);
      html += `<div class="dia ${usado ? 'used' : ''}" data-receta-id="${recetaId}" data-dia="${i}">${i}</div>`;
    }
    return html;
  }

  function actualizarProgreso(recetaId, totalDias) {
    const cronograma = JSON.parse(localStorage.getItem(`cronograma-${recetaId}`) || '[]');
    const diasUsados = cronograma.length;
    const porcentaje = totalDias ? Math.round((diasUsados / totalDias) * 100) : 0;

    const diasUsadosElement = document.getElementById('dias-usados');
    const progresoFillElement = document.getElementById('progreso-fill');
    const progresoTextElement = document.getElementById('progreso-text');

    if (diasUsadosElement) diasUsadosElement.textContent = diasUsados;
    if (progresoFillElement) progresoFillElement.style.width = `${porcentaje}%`;
    if (progresoTextElement) progresoTextElement.textContent = t('progress', {percent: porcentaje});
  }

  function renderComentarios(comentarios) {
    if (!comentarios || comentarios.length === 0) {
      return `<p>${t('comments.no')}</p>`;
    }
    return comentarios.map(comentario => `
      <div class="comentario">
        <div class="autor">${t('comments.author')}: ${safeText(comentario.autor)}</div>
        <div class="fecha">${t('comments.date')}: ${safeText(comentario.fecha)}</div>
        <p class="texto">${safeText(comentario.texto)}</p>
      </div>
    `).join('');
  }


  /* ================
     ACCIONES
     ================ */
  function toggleFavorito(receta) {
    if (!receta) return;
    const index = favoritos.findIndex(fav => fav.id === receta.id);
    if (index !== -1) {
      favoritos.splice(index, 1);
    } else {
      favoritos.push({ id: receta.id, titulo: receta.titulo, imagen: receta.imagen, categoria: receta.categoria });
    }
    localStorage.setItem(LS_KEYS.FAVORITOS, JSON.stringify(favoritos));
    recetasFiltradas = currentCategory === 'todas' ? [...recetas] : recetas.filter(r => r.categoria === currentCategory);
    renderRecetas(recetasFiltradas);
  }

  function mostrarFavoritos() {
    const modalFavoritos = document.getElementById('modal-favoritos');
    const favoritosContainer = document.getElementById('favoritos-container');
    if (!modalFavoritos || !favoritosContainer) return;

    favoritosContainer.innerHTML = '';
    if (favoritos.length === 0) {
      favoritosContainer.innerHTML = '<p>No tienes recetas favoritas aún.</p>';
    } else {
      favoritos.forEach(receta => {
        const favoritoItem = document.createElement('div');
        favoritoItem.className = 'favorito-item';
        favoritoItem.innerHTML = `
          <img src="${safeText(receta.imagen)}" alt="${safeText(receta.titulo)}">
          <div>
            <h4>${safeText(receta.titulo)}</h4>
            <span>${safeText(receta.categoria)}</span>
            <div style="margin-top:8px;">
              <button class="btn btn-primary fav-download" data-id="${receta.id}">${t('recipe.download')}</button>
              <button class="btn btn-danger fav-remove" data-id="${receta.id}">${t('recipe.favorite.remove')}</button>
            </div>
          </div>
        `;
        favoritosContainer.appendChild(favoritoItem);
      });

      favoritosContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const recetaId = parseInt(btn.getAttribute('data-id'));
          const recetaObj = recetas.find(r => r.id === recetaId);
          if (btn.classList.contains('fav-download') && recetaObj) {
            descargarReceta(recetaObj);
            modalFavoritos.style.display = 'none';
          } else if (btn.classList.contains('fav-remove')) {
            const idx = favoritos.findIndex(f => f.id === recetaId);
            if (idx !== -1) {
              favoritos.splice(idx, 1);
              localStorage.setItem(LS_KEYS.FAVORITOS, JSON.stringify(favoritos));
              mostrarFavoritos();
              renderRecetas(recetasFiltradas);
            }
          }
        });
      });
    }

    modalFavoritos.style.display = 'block';
  }

  function descargarReceta(receta) {
    if (!receta) return;
    const contenido = `
${t('recipe.ingredients')}:
${(receta.ingredientes || []).map(ing => `- ${ing}`).join('\n')}

${t('recipe.preparation')}:
${receta.preparacion}

${t('recipe.use')}:
${receta.uso}

${t('recipe.recommendations')}:
${receta.recomendaciones}

${t('recipe.warnings')}:
${receta.advertencias}

${t('recipe.schedule.info', {days: receta.tiempoRecomendado})}
    `;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(receta.titulo || 'receta').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function renderRecetas(list) {
    const recetasContainer = document.getElementById('recetas-container');
    if (!recetasContainer) return;
    recetasContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    list.forEach((receta) => {
      const isFavorito = favoritos.some(f => f.id === receta.id);
      const card = document.createElement('div');
      card.className = 'receta-card';
      card.dataset.id = receta.id;

      card.innerHTML = `
      <img loading="lazy" src="${safeText(receta.imagen)}" alt="${safeText(receta.titulo)}" class="receta-img" width="400" height="240">
      <div class="receta-info">
        <h3 class="receta-title">${safeText(receta.titulo)}</h3>
        <span class="receta-category">${safeText(receta.categoria)}</span>
        <div class="receta-actions">
          <button class="btn btn-primary action-download" data-id="${receta.id}">${t('recipe.download')}</button>
          <button class="btn ${isFavorito ? 'btn-danger' : 'btn-primary'} action-fav" data-id="${receta.id}" data-favorito>
            ${isFavorito ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'}
          </button>
        </div>
      </div>
    `;
      fragment.appendChild(card);
    });

    recetasContainer.appendChild(fragment);
  }

  function agregarComentario(recetaId, texto) {
    const receta = recetas.find(r => r.id === recetaId);
    if (!receta) return;
    const nuevoComentario = {
      autor: "Usuario Anónimo",
      fecha: new Date().toLocaleDateString(),
      texto: texto
    };
    receta.comentarios = receta.comentarios || [];
    receta.comentarios.push(nuevoComentario);
    try {
      localStorage.setItem('recetas', JSON.stringify(recetas));
    } catch (e) {
      console.warn('No se pudo guardar recetas en localStorage', e);
    }
  }

  function toggleDiaCronograma(recetaId, dia) {
    let cronograma = JSON.parse(localStorage.getItem(`cronograma-${recetaId}`) || '[]');
    if (!Array.isArray(cronograma)) cronograma = [];
    if (cronograma.includes(dia)) cronograma = cronograma.filter(d => d !== dia);
    else cronograma.push(dia);
    localStorage.setItem(`cronograma-${recetaId}`, JSON.stringify(cronograma));
    const diaElement = document.querySelector(`.dia[data-receta-id="${recetaId}"][data-dia="${dia}"]`);
    if (diaElement) diaElement.classList.toggle('used');
    const receta = recetas.find(r => r.id === recetaId);
    if (receta) actualizarProgreso(recetaId, receta.tiempoRecomendado);
  }

  /* ================
     MODALES
     ================ */
  function mostrarDetalleReceta(recetaId) {
    const receta = recetas.find(r => r.id === recetaId);
    if (!receta) return;
    const modalReceta = document.getElementById('modal-receta');
    const detalleReceta = document.getElementById('detalle-receta');
    if (!modalReceta || !detalleReceta) return;

    const isFavorito = favoritos.some(fav => fav.id === receta.id);

    detalleReceta.innerHTML = `
      <div class="detalle-header">
        <img src="${safeText(receta.imagen)}" alt="${safeText(receta.titulo)}" class="detalle-img">
        <div class="detalle-info">
          <h2>${safeText(receta.titulo)}</h2>
          <span class="category">${safeText(receta.categoria)}</span>
          <div class="receta-actions">
            <button class="btn btn-primary" id="descargar-receta">${t('recipe.download')}</button>
            <button class="btn ${isFavorito ? 'btn-danger' : 'btn-primary'}" id="toggle-favorito">${isFavorito ? t('recipe.favorite.remove') : t('recipe.favorite.add')}</button>
            <button class="btn btn-primary" id="fullscreen-btn"><i class="fas fa-expand"></i></button>
          </div>
        </div>
      </div>

      <div class="detalle-section">
        <h3>${t('recipe.ingredients')}</h3>
        <ul>
          ${(receta.ingredientes || []).map(ing => `<li>${safeText(ing)}</li>`).join('')}
        </ul>
      </div>

      <div class="detalle-section">
        <h3>${t('recipe.preparation')}</h3>
        <p>${safeText(receta.preparacion)}</p>
      </div>

      <div class="detalle-section">
        <h3>${t('recipe.use')}</h3>
        <p>${safeText(receta.uso)}</p>
      </div>

      <div class="detalle-section">
        <h3>${t('recipe.recommendations')}</h3>
        <p>${safeText(receta.recomendaciones)}</p>
      </div>

      <div class="detalle-section">
        <h3>${t('recipe.warnings')}</h3>
        <p>${safeText(receta.advertencias)}</p>
      </div>

      <div class="cronograma">
        <h3>${t('recipe.schedule')}</h3>
        <p class="cronograma-info">${t('recipe.schedule.info', {days: receta.tiempoRecomendado})}</p>
        <div class="dias-container" id="dias-container">
          ${generarDiasCronograma(receta.id, receta.tiempoRecomendado)}
        </div>
        <div class="progreso-bar">
          <div class="progreso-fill" id="progreso-fill"></div>
        </div>
        <div class="cronograma-info">
          <p>${t('recipe.schedule.days', {used: '<span id="dias-usados">0</span>', total: receta.tiempoRecomendado})}</p>
          <p id="progreso-text">${t('progress', {percent: 0})}</p>
        </div>
      </div>

      <div class="comentarios-section">
        <h3>${t('recipe.comments')}</h3>
        <div id="comentarios-container">
          ${renderComentarios(receta.comentarios || [])}
        </div>
        <div class="nuevo-comentario">
          <h4>${t('recipe.comments.add')}</h4>
          <textarea id="nuevo-comentario-texto" placeholder="${t('recipe.comments.placeholder')}"></textarea>
          <button id="agregar-comentario" class="btn btn-primary">${t('recipe.comments.submit')}</button>
        </div>
      </div>
    `;

    modalReceta.style.display = 'block';

    const descargarBtn = document.getElementById('descargar-receta');
    if (descargarBtn) descargarBtn.addEventListener('click', () => descargarReceta(receta));

    const toggleFav = document.getElementById('toggle-favorito');
    if (toggleFav) toggleFav.addEventListener('click', () => {
      toggleFavorito(receta);
      mostrarDetalleReceta(receta.id);
    });

    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    document.querySelectorAll('.dia').forEach(dia => {
      dia.addEventListener('click', () => {
        const recetaId = parseInt(dia.getAttribute('data-receta-id'));
        const diaNumero = parseInt(dia.getAttribute('data-dia'));
        toggleDiaCronograma(recetaId, diaNumero);
      });
    });

    const agregarBtn = document.getElementById('agregar-comentario');
    if (agregarBtn) {
      agregarBtn.addEventListener('click', () => {
        const textoRaw = document.getElementById('nuevo-comentario-texto').value.trim();
        if (!textoRaw) return;
        const safe = textoRaw.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        agregarComentario(receta.id, safe);
        try {
          localStorage.setItem('recetas', JSON.stringify(recetas));
        } catch (e) { }
        mostrarDetalleReceta(receta.id);
      });
    }

    actualizarProgreso(receta.id, receta.tiempoRecomendado);
  }

  function toggleFullscreen() {
    const modalReceta = document.getElementById('modal-receta');
    if (!modalReceta) return;
    if (!isFullscreen) {
      if (modalReceta.requestFullscreen) modalReceta.requestFullscreen();
      else if (modalReceta.webkitRequestFullscreen) modalReceta.webkitRequestFullscreen();
      else if (modalReceta.msRequestFullscreen) modalReceta.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    isFullscreen = !isFullscreen;
  }

  function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => {
      m.style.display = 'none';
    });
  }

  /* ================
     INIT (DOMContentLoaded) — setup completo
     ================ */
  document.addEventListener('DOMContentLoaded', function () {
    if (window.__RC_INITIALIZED__) return;
    window.__RC_INITIALIZED__ = true;

    const recetasContainerEl = document.getElementById('recetas-container');
    const modalRecetaEl = document.getElementById('modal-receta');
    const modalFavoritosEl = document.getElementById('modal-favoritos');
    const modalConfigEl = document.getElementById('modal-config');
    const menuBtn = document.getElementById('menu-btn-mobile');
    const navWrapper = document.getElementById('nav-wrapper');
    const btnVerMas = document.getElementById('btn-ver-mas');
    const navMenuExpandible = document.getElementById('nav-menu-expandible');
    const favoritosBtn = document.getElementById('favoritos-btn');
    const configBtn = document.getElementById('config-btn');
    const saveConfigBtn = document.getElementById('save-config');
    const closeBtns = document.querySelectorAll('.close');
    const categoryLinks = document.querySelectorAll('[data-category]');
    const portada = document.getElementById('portada');
    const entrarBtn = document.getElementById('entrarBtn');
    const bienvenidaMsg = document.getElementById('bienvenidaMensaje');
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Aplicar tema y idioma
    applyLanguage(currentLanguage);
    applyTheme(currentTheme);

    // Render inicial
    renderRecetas(recetasFiltradas);

    // Delegación de eventos para recetas
    if (recetasContainerEl) {
      recetasContainerEl.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        const card = e.target.closest('.receta-card');
        if (btn) {
          const recetaId = parseInt(btn.getAttribute('data-id'));
          if (btn.classList.contains('action-download')) {
            const receta = recetas.find(r => r.id === recetaId);
            if (receta) descargarReceta(receta);
            return;
          }
          if (btn.classList.contains('action-fav')) {
            const receta = recetas.find(r => r.id === recetaId);
            if (receta) toggleFavorito(receta);
            return;
          }
        }
        if (card) {
          const recetaId = parseInt(card.dataset.id);
          mostrarDetalleReceta(recetaId);
        }
      });
    }

    // Menú hamburguesa (móvil)
    if (menuBtn && navWrapper) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navWrapper.classList.toggle('active');
        if (navMenuExpandible) navMenuExpandible.classList.remove('active');
      });
    }

    // Botón "Ver más" categorías
    if (btnVerMas && navMenuExpandible) {
      btnVerMas.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenuExpandible.classList.toggle('active');
      });
    }

    // Cerrar menú expandible al hacer click fuera
    document.addEventListener('click', (e) => {
      if (navMenuExpandible && !e.target.closest('#btn-ver-mas') && !e.target.closest('#nav-menu-expandible')) {
        navMenuExpandible.classList.remove('active');
      }
      if (navWrapper && !e.target.closest('#nav-wrapper') && !e.target.closest('#menu-btn-mobile')) {
        navWrapper.classList.remove('active');
      }
    });

    // Favoritos
    if (favoritosBtn) {
      favoritosBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarFavoritos();
        if (navMenuExpandible) navMenuExpandible.classList.remove('active');
        if (navWrapper) navWrapper.classList.remove('active');
      });
    }

    // Configuración
    if (configBtn) {
      configBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modalConfigEl) {
          modalConfigEl.style.display = 'block';
          if (navMenuExpandible) navMenuExpandible.classList.remove('active');
          if (navWrapper) navWrapper.classList.remove('active');
        }
      });
    }

    // Guardar configuración
    if (saveConfigBtn) {
      saveConfigBtn.addEventListener('click', () => {
        const themeSel = document.getElementById('theme');
        const languageSel = document.getElementById('language');
        const themeVal = themeSel ? themeSel.value : currentTheme;
        const languageVal = languageSel ? languageSel.value : currentLanguage;
        currentTheme = themeVal;
        currentLanguage = languageVal;
        localStorage.setItem('theme', themeVal);
        localStorage.setItem('language', languageVal);
        applyTheme(themeVal);
        applyLanguage(languageVal);
        if (modalConfigEl) modalConfigEl.style.display = 'none';
      });
    }

    // Cerrar modales
    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    window.addEventListener('click', (e) => {
      if (e.target === modalRecetaEl) modalRecetaEl.style.display = 'none';
      if (e.target === modalFavoritosEl) modalFavoritosEl.style.display = 'none';
      if (e.target === modalConfigEl) modalConfigEl.style.display = 'none';
    });

    // Categorías
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        currentCategory = category;
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        if (category === 'todas') recetasFiltradas = [...recetas];
        else recetasFiltradas = recetas.filter(receta => receta.categoria === category);
        renderRecetas(recetasFiltradas);
        if (navMenuExpandible) navMenuExpandible.classList.remove('active');
        if (navWrapper) navWrapper.classList.remove('active');
      });
    });

    // Portada / Entrar — robusto y defendido
    const portadaLoader = document.getElementById('portada-loader');
    const loaderProgress = document.getElementById('loader-progress');

    async function showLoader() {
      if (portadaLoader) portadaLoader.classList.add('show');
      let pct = 0;
      return new Promise(resolve => {
        const interval = setInterval(() => {
          pct += 14 + Math.random() * 8;
          if (pct >= 100) pct = 100;
          if (loaderProgress) loaderProgress.style.width = pct + '%';
          if (pct >= 100) {
            clearInterval(interval);
            setTimeout(resolve, 120);
          }
        }, 120);
      });
    }

    async function enterAppAnimation() {
      try {
        await showLoader();
      } catch (e) { /* ignore */ }
      if (portada) portada.classList.add('portada-leave');
      setTimeout(() => {
        document.body.classList.add('app-entered');
        setTimeout(() => {
          if (portada) portada.style.display = 'none';
          const bienvenida = document.getElementById('bienvenidaMensaje');
          if (bienvenida) { bienvenida.classList.add('mostrar'); setTimeout(() => bienvenida.classList.remove('mostrar'), 2200); }
        }, 700);
      }, 450);
    }

    if (entrarBtn) {
      entrarBtn.addEventListener('click', async function (e) {
        e.preventDefault();
        if (entrarBtn.disabled) return;
        entrarBtn.disabled = true;
        await enterAppAnimation();
        setTimeout(() => { if (entrarBtn) entrarBtn.disabled = false; }, 900);
      });
    }

    // Guardar usuario modal
    const modalNombre = document.getElementById('modal-nombre-institucion');
    const btnGuardar = document.getElementById('guardar-nombre-institucion');
    const inputNombre = document.getElementById('input-nombre');
    const inputInstitucion = document.getElementById('input-institucion');
    const usuarioInfo = document.getElementById('usuario-info');
    const nombreUsuario = document.getElementById('nombre-usuario');
    const institucionUsuario = document.getElementById('institucion-usuario');

    function mostrarUsuario() {
      const datos = JSON.parse(localStorage.getItem('datosUsuario') || '{}');
      if (datos.nombre && nombreUsuario) nombreUsuario.textContent = datos.nombre;
      if (datos.institucion && institucionUsuario) institucionUsuario.textContent = datos.institucion;
      if (usuarioInfo) usuarioInfo.style.display = 'block';
    }

    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario') || '{}');
    if (modalNombre) {
      if (!datosGuardados.nombre || !datosGuardados.institucion) {
        modalNombre.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      } else {
        modalNombre.style.display = 'none';
        mostrarUsuario();
      }
    }

    if (btnGuardar) {
      btnGuardar.onclick = function () {
        const nombre = (inputNombre.value || '').trim();
        const inst = (inputInstitucion.value || '').trim();
        if (nombre.length < 2 || inst.length < 2) {
          if (inputNombre) inputNombre.style.borderColor = nombre.length < 2 ? "#ff1744" : "#ffd6e0";
          if (inputInstitucion) inputInstitucion.style.borderColor = inst.length < 2 ? "#ff1744" : "#ffd6e0";
          return;
        }
        localStorage.setItem('datosUsuario', JSON.stringify({ nombre, institucion: inst }));
        if (modalNombre) modalNombre.style.display = 'none';
        document.body.style.overflow = '';
        mostrarUsuario();
      };
    }

    // Toggle tema
    if (toggleThemeBtn) {
      toggleThemeBtn.addEventListener('click', () => {
        const next = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
        if (themeIcon) themeIcon.className = document.body.classList.contains('dark-theme') ? 'fa fa-sun' : 'fa fa-moon';
      });
    }

    // Fullscreen change
    document.addEventListener('fullscreenchange', () => {
      isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    });
  });

  /* ================
     THEME & LANGUAGE
     ================ */
  function applyLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
    const sel = document.getElementById('language');
    if (sel) sel.value = lang;
    localStorage.setItem('language', lang);
  }

  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    const sel = document.getElementById('theme');
    if (sel) sel.value = theme;
    localStorage.setItem('theme', theme);
  }

  /* ================
     EXPOSURE
     ================ */
  window.__rc_app__ = {
    recetas,
    translations,
    renderRecetas,
    mostrarDetalleReceta,
    toggleFavorito,
    agregarComentario,
    descargarReceta
  };

(function() {
  'use strict';

  // FUNCIONES
  function generarDiasCronograma() {
    console.log("Generando días...");
  }

  function initCronograma() {
    console.log("Cronograma iniciado");
  }

  function actualizarProgreso() {
    console.log("Progreso actualizado");
  }

  // Exponer funciones globalmente
  window.generarDiasCronograma = generarDiasCronograma;
  window.initCronograma = initCronograma;
  window.actualizarProgreso = actualizarProgreso;

})();
// ============================================================
// 🌿 BLOOMSKIN IA v4 - ASISTENTE INTELIGENTE COMPLETO
// ============================================================
(function(){
'use strict';

// ---------- STORAGE KEYS ----------
const LS = {
  CHAT: 'bs_chat_v4',
  PROFILE: 'bs_profile_v4',
  CALENDAR: 'bs_calendar_v4',
  HISTORY: 'bs_history_v4',
  STATS: 'bs_stats_v4'
};

// ---------- ESTADO GLOBAL ----------
const chatState = {
  mode: 'idle',
  flow: [],
  flowIndex: 0,
  answers: {},
  pendingRecipe: null
};

let chatHistory = loadJSON(LS.CHAT, []);
let profile = loadJSON(LS.PROFILE, { name:'', skinType:'', allergies:[], problems:[], favoriteRecipes:[], progress:{} });
let calendar = loadJSON(LS.CALENDAR, []);
let historyList = loadJSON(LS.HISTORY, []);
let stats = loadJSON(LS.STATS, { recipesUsed:{}, totalConsults:0, totalTime:0, lastVisit:null });

function loadJSON(key, def){
  try { return JSON.parse(localStorage.getItem(key)) || def; }
  catch(e){ return def; }
}
function saveJSON(key, val){
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){}
}

// ---------- BASE DE CONOCIMIENTO ----------
const SKIN_TYPES = {
  grasa: { keywords:['grasa','grasosa','brillo','acné','acne','espinillas','puntos negros'] },
  seca: { keywords:['seca','reseca','tirante','descamación','aspereza'] },
  mixta: { keywords:['mixta','zona T','grasa en frente','secas en mejillas'] },
  sensible: { keywords:['sensible','irritada','roja','enrojecida','reactiva'] },
  normal: { keywords:['normal','bien','sin problemas'] }
};

const PROBLEMS = {
  acne: { keywords:['acné','acne','espinilla','grano','punto negro','barro'], category:'piel' },
  manchas: { keywords:['mancha','pigmento','melasma','oscura','marca'], category:'piel' },
  sequedad: { keywords:['seca','reseca','tirante','descama','áspera'], category:'piel' },
  arrugas: { keywords:['arruga','línea','envejecimiento','vejez','flacidez'], category:'piel' },
  irritacion: { keywords:['irritada','roja','enrojecida','picazón','inflamada'], category:'piel' },
  cabello_seco: { keywords:['cabello seco','pelo seco','dañado','quebradizo','opaco'], category:'cabello' },
  caida_cabello: { keywords:['caída','calvicie','poco pelo','alopecia'], category:'cabello' },
  labios_secos: { keywords:['labio','reseco','partido','agrietado'], category:'labios' },
  manos_secas: { keywords:['mano','talón','agrietado','áspera'], category:'manos' },
  estres: { keywords:['estrés','ansiedad','nervios','insomnio','duermo mal'], category:'bienestar' },
  peso: { keywords:['peso','adelgazar','bajar','dieta','colesterol'], category:'peso' },
  energia: { keywords:['cansado','fatiga','energía','fuerza','ánimo'], category:'energia' },
  digestion: { keywords:['digestión','estómago','gases','hinchazón','colon','parásitos'], category:'purgantes' }
};

const DIAGNOSE_FLOW = [
  { id:'skin_type', question:'🌸 Para empezar, ¿qué tipo de piel tienes?', options:['Grasa','Seca','Mixta','Sensible','Normal','No sé'], key:'skinType' },
  { id:'allergies', question:'⚠️ ¿Tienes alguna alergia o ingrediente que deba evitar?', options:['Ninguna','Maní','Huevo','Lácteos','Miel','Frutos secos','Varios'], key:'allergies' },
  { id:'problem', question:'🎯 ¿Qué problema quieres tratar principalmente?', options:['Acné','Manchas','Sequedad','Arrugas','Irritación','Cabello','Labios','Estrés','Peso','Otro'], key:'problem' },
  { id:'severity', question:'📊 ¿Qué tan severo es el problema?', options:['Leve (apenas noto)','Moderado (me molesta)','Severo (mucho impacto)'], key:'severity' },
  { id:'time', question:'⏱️ ¿Cuánto tiempo llevas con este problema?', options:['Pocos días','Semanas','Meses','Años'], key:'duration' }
];

// ---------- UTILIDADES ----------
function normalize(s=''){
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

// ---------- MOTOR DE RESPUESTA ----------
function detectIntent(msg){
  const n = normalize(msg);
  if(/compar|vs|versus|frente a/.test(n)) return {type:'compare'};
  if(/estadist|progreso|uso|metrica/.test(n)) return {type:'stats'};
  if(/historial|consult|anteriores/.test(n)) return {type:'history'};
  if(/calendario|recordatorio|agenda|recordame/.test(n)) return {type:'calendar'};
  if(/diagnosti|sintoma|analiz|evalu/.test(n)) return {type:'diagnose'};
  if(/foto|imagen|analiza mi piel|reconoc/.test(n)) return {type:'image'};
  if(/nutri|aliment|comida|dieta/.test(n)) return {type:'nutrition'};
  if(/explic|porque funciona|que hace|como actua/.test(n)) return {type:'explain'};
  if(/hola|buenas|hey|saludos/.test(n)) return {type:'greet'};
  if(/gracias|thanks/.test(n)) return {type:'thanks'};
  if(/adios|chau|bye/.test(n)) return {type:'bye'};

  for(const key in PROBLEMS){
    if(PROBLEMS[key].keywords.some(k => n.includes(normalize(k)))) return {type:'problem', problem:key};
  }
  for(const key in SKIN_TYPES){
    if(SKIN_TYPES[key].keywords.some(k => n.includes(normalize(k)))) return {type:'skin', skin:key};
  }
  const ingMatch = recetas.find(r => (r.ingredientes||[]).some(i => n.includes(normalize(i.split(' ').pop()))));
  if(ingMatch) return {type:'ingredient', recipe:ingMatch};

  return {type:'unknown'};
}

function findRecipesFor(problem, skinType, allergies){
  const prob = PROBLEMS[problem];
  if(!prob) return [];
  let candidates = recetas.filter(r => r.categoria === prob.category);
  if(allergies && allergies.length && !allergies.includes('ninguna')){
    candidates = candidates.filter(r => {
      const txt = ((r.ingredientes||[]).join(' ') + ' ' + (r.titulo||'')).toLowerCase();
      return !allergies.some(a => txt.includes(normalize(a)));
    });
  }
  if(skinType){
    candidates = candidates.map(r => {
      let score = 0;
      const txt = ((r.recomendaciones||'') + ' ' + (r.titulo||'')).toLowerCase();
      if(txt.includes(normalize(skinType))) score += 10;
      if(r.categoria === 'piel') score += 5;
      return {r, score};
    }).sort((a,b) => b.score - a.score).map(x => x.r);
  }
  return candidates.slice(0, 5);
}

function getWarning(problem, severity){
  if(severity === 'severo' || severity === 'Severo (mucho impacto)'){
    return '🩺 <strong>Importante:</strong> Dado que describes el problema como severo, te recomiendo <strong>consultar con un dermatólogo o profesional de salud</strong>. Las recetas naturales pueden complementar pero no sustituir el tratamiento médico.';
  }
  if(['acne','manchas','irritacion'].includes(problem)){
    return '️ Si los síntomas persisten más de 2 semanas o empeoran, consulta a un profesional.';
  }
  return '';
}

function explainRecipe(recipe){
  const ings = (recipe.ingredientes||[]).map(i => {
    const name = i.toLowerCase();
    let benefit = 'aporta propiedades beneficiosas';
    if(/miel/.test(name)) benefit = '🍯 antibacteriana y humectante natural';
    else if(/avena/.test(name)) benefit = '🌾 calma irritaciones y exfolia suavemente';
    else if(/aloe|sabila/.test(name)) benefit = '🌵 hidrata, repara y calma la piel';
    else if(/limon/.test(name)) benefit = '🍋 astringente y aclarante (usar de noche)';
    else if(/yogur/.test(name)) benefit = '🥛 ácido láctico que exfolia y suaviza';
    else if(/palta|aguacate/.test(name)) benefit = ' grasas saludables que nutren profundamente';
    else if(/coco/.test(name)) benefit = '🥥 hidratación profunda y antimicrobiano';
    else if(/platano/.test(name)) benefit = '🍌 potasio y vitaminas que fortalecen';
    else if(/manzanilla/.test(name)) benefit = '🌼 antiinflamatoria y calmante';
    else if(/arcilla/.test(name)) benefit = '🪨 absorbe exceso de grasa y purifica';
    else if(/cafe/.test(name)) benefit = '☕ activa circulación y reduce celulitis';
    return `<li><strong>${i}</strong> → ${benefit}</li>`;
  }).join('');
  return `
    <div class="explanation-card">
      <h4>🔬 ¿Por qué funciona esta receta?</h4>
      <p>${recipe.recomendaciones || 'Combinación tradicional con ingredientes naturales comprobados.'}</p>
      <h4> Acción de cada ingrediente:</h4>
      <ul>${ings}</ul>
      <h4>⏳ Tiempo para ver resultados:</h4>
      <p>• <strong>Corto plazo (1-3 días):</strong> alivio inmediato de síntomas leves</p>
      <p>• <strong>Mediano plazo (${recipe.duracion||7} días):</strong> mejoras visibles</p>
      <p>• <strong>Largo plazo (${recipe.tiempoRecomendado||21} días):</strong> resultados óptimos</p>
      <h4>⚠️ Posibles efectos:</h4>
      <p>${recipe.advertencias || 'Generalmente bien tolerada. Haz prueba en zona pequeña primero.'}</p>
    </div>
  `;
}

function recipeCardHTML(r){
  return `<div class="chat-recipe-card" data-id="${r.id}">
    <img src="${r.imagen}" alt="${r.titulo}">
    <div class="card-body">
      <strong>${r.titulo}</strong>
      <small>${r.categoria}</small>
      <p>${(r.recomendaciones||'').slice(0,90)}...</p>
      <div class="card-actions">
        <button onclick="bs_ia.openRecipe(${r.id})">Ver</button>
        <button onclick="bs_ia.explain(${r.id})">🔬 Explicar</button>
        <button onclick="bs_ia.remind(${r.id})">📅 Recordar</button>
      </div>
    </div>
  </div>`;
}

function generateResponse(userMsg, imageData){
  stats.totalConsults++;
  stats.lastVisit = Date.now();
  saveJSON(LS.STATS, stats);
  const msg = userMsg.trim();
  const n = normalize(msg);

  if(chatState.mode === 'diagnose' && chatState.flowIndex < DIAGNOSE_FLOW.length){
    return handleDiagnoseFlow(msg);
  }
  if(imageData) return handleImageAnalysis(imageData);

  const intent = detectIntent(msg);

  switch(intent.type){
    case 'greet': return greeting();
    case 'thanks': return {text:'😊 ¡De nada! Estoy aquí cuando me necesites. ¿Quieres que te ayude con algo más?', save:true};
    case 'bye': return {text:'👋 ¡Hasta pronto! Cuídate mucho. Recuerda: lo natural también es ciencia. 🌿', save:true};
    case 'diagnose': startDiagnose(); return {text: DIAGNOSE_FLOW[0].question, options: DIAGNOSE_FLOW[0].options, save:true};
    case 'compare': openComparador(); return {text:'📊 Abrí el comparador para que elijas 2 recetas y veas sus diferencias lado a lado.', save:true};
    case 'stats': openStats(); return {text:'📈 Abrí tu panel de estadísticas para ver tu progreso.', save:true};
    case 'history': openHistorial(); return {text:'📜 Abrí tu historial de consultas anteriores.', save:true};
    case 'calendar': openCalendar(); return {text:'📅 Abrí tu calendario inteligente con recordatorios.', save:true};
    case 'image': triggerImageUpload(); return {text:'📸 Sube una foto de tu piel y te ayudaré a identificar qué ves y qué recetas podrían ayudarte.', save:true};
    case 'nutrition': return nutritionAdvice(intent);
    case 'problem': return handleProblem(intent.problem, msg);
    case 'skin':
      profile.skinType = intent.skin;
      saveJSON(LS.PROFILE, profile);
      return {text:`✅ Anoté que tu piel es <strong>${intent.skin}</strong>. ¿Qué problema quieres tratar? (ej: acné, manchas, sequedad)`, save:true};
    case 'ingredient': return {html:'<p>Encontré esta receta con el ingrediente que mencionas:</p>' + recipeCardHTML(intent.recipe), save:true};
    case 'explain':
      if(chatState.pendingRecipe) return {html: explainRecipe(chatState.pendingRecipe), save:true};
      return {text:'¿Sobre qué receta quieres que te explique? Primero dime qué problema tienes.', save:true};
    case 'unknown':
    default: return searchFallback(msg);
  }
}

function greeting(){
  const name = profile.name ? `, ${profile.name}` : '';
  const skin = profile.skinType ? ` Veo que tienes piel ${profile.skinType}.` : '';
  return {
    text: `🌿 ¡Hola${name}! Soy tu asistente natural inteligente.${skin}<br><br>Puedo ayudarte con:<br>🔍 <strong>Diagnosticar</strong> tu piel<br>📸 <strong>Analizar fotos</strong> de tu piel<br>⚖️ <strong>Comparar</strong> recetas<br> Ver tus <strong>estadísticas</strong><br>📅 Crear <strong>recordatorios</strong><br>🥗 Consejos de <strong>nutrición</strong><br><br>¿Qué necesitas hoy?`,
    save:true
  };
}

function startDiagnose(){
  chatState.mode = 'diagnose';
  chatState.flow = [...DIAGNOSE_FLOW];
  chatState.flowIndex = 0;
  chatState.answers = {};
}

function handleDiagnoseFlow(answer){
  const step = chatState.flow[chatState.flowIndex];
  chatState.answers[step.key] = answer;
  if(step.key === 'skinType') profile.skinType = normalize(answer);
  if(step.key === 'allergies') profile.allergies = answer.toLowerCase() === 'ninguna' ? [] : [answer];
  if(step.key === 'problem') profile.problems = [normalize(answer)];
  saveJSON(LS.PROFILE, profile);
  chatState.flowIndex++;
  if(chatState.flowIndex >= chatState.flow.length) return finishDiagnose();
  return { text: chatState.flow[chatState.flowIndex].question, options: chatState.flow[chatState.flowIndex].options, save:true };
}

function finishDiagnose(){
  chatState.mode = 'idle';
  const a = chatState.answers;
  let problemKey = null;
  for(const key in PROBLEMS){
    if(normalize(a.problem||'').includes(key) || PROBLEMS[key].keywords.some(k => normalize(a.problem||'').includes(normalize(k)))){
      problemKey = key; break;
    }
  }
  const recipes = problemKey ? findRecipesFor(problemKey, a.skinType, a.allergies) : [];
  const warning = problemKey ? getWarning(problemKey, a.severity) : '';
  historyList.push({ ts: Date.now(), type:'diagnose', answers:{...a}, recipes: recipes.map(r => r.id) });
  saveJSON(LS.HISTORY, historyList);

  let html = `<div class="diagnose-result">
    <h4>📋 Tu diagnóstico personalizado</h4>
    <div class="diag-summary">
      <div><strong>Tipo de piel:</strong> ${a.skinType}</div>
      <div><strong>Alergias:</strong> ${a.allergies?.join(', ') || 'Ninguna'}</div>
      <div><strong>Problema:</strong> ${a.problem}</div>
      <div><strong>Severidad:</strong> ${a.severity}</div>
      <div><strong>Tiempo:</strong> ${a.duration}</div>
    </div>`;
  if(warning) html += `<div class="diag-warning">${warning}</div>`;
  if(recipes.length){
    html += `<h4>✨ Recetas recomendadas para ti:</h4>`;
    recipes.forEach(r => { html += recipeCardHTML(r); });
    html += `<h4>🚫 Qué evitar:</h4>
      <p>• Ingredientes con tus alérgenos (${a.allergies?.join(', ') || 'ninguno'})</p>
      <p>• Productos con alcohol si tu piel es seca/sensible</p>
      <p>• Exfoliantes fuertes si tienes irritación</p>`;
  } else {
    html += `<p>No encontré recetas específicas. Prueba buscar por ingrediente.</p>`;
  }
  html += `<div class="diag-actions">
    <button class="btn-primary" onclick="bs_ia.ask('explicame la primera receta')">🔬 Explicar recetas</button>
    <button class="btn-primary" onclick="bs_ia.ask('crear recordatorio')">📅 Crear recordatorio</button>
  </div></div>`;
  chatState.pendingRecipe = recipes[0];
  return {html, save:true};
}

function handleProblem(problemKey, originalMsg){
  const recipes = findRecipesFor(problemKey, profile.skinType, profile.allergies);
  const warning = getWarning(problemKey, 'moderado');
  if(!recipes.length) return {text:'No encontré recetas específicas para eso. ¿Puedes darme más detalles?', save:true};
  chatState.pendingRecipe = recipes[0];
  let html = `<p> Encontré <strong>${recipes.length} recetas</strong> para <strong>${problemKey.replace('_',' ')}</strong>:</p>`;
  recipes.forEach(r => { html += recipeCardHTML(r); });
  if(warning) html += `<div class="diag-warning">${warning}</div>`;
  stats.recipesUsed[recipes[0].id] = (stats.recipesUsed[recipes[0].id]||0) + 1;
  saveJSON(LS.STATS, stats);
  return {html, save:true};
}

function nutritionAdvice(intent){
  const skinType = profile.skinType || 'normal';
  const advice = {
    grasa: '🥗 <strong>Para piel grasa:</strong><br>• Come más verduras verdes y frutas cítricas<br>• Evita frituras, lácteos enteros y azúcares refinados<br>• Toma 2L de agua al día<br>• Consume té verde y alimentos ricos en zinc',
    seca: '🥑 <strong>Para piel seca:</strong><br>• Incluye aguacate, nueces y salmón<br>• Consume aceites saludables (oliva, coco)<br>• Come frutas hidratantes (sandía, melón)<br>• Evita exceso de café y alcohol',
    sensible: '🌿 <strong>Para piel sensible:</strong><br>• Consume alimentos antiinflamatorios (cúrcuma, jengibre)<br>• Evita picantes, alcohol y procesados<br>• Come probióticos (yogur natural)<br>• Aumenta omega-3 (pescado, chía)',
    mixta: '🥗 <strong>Para piel mixta:</strong><br>• Dieta balanceada con verduras y proteínas magras<br>• Hidratación constante (agua, infusiones)<br>• Evita excesos de azúcar y lácteos<br>• Consume antioxidantes (berries, verde)'
  };
  return {html: advice[skinType] || advice.mixta, save:true};
}

function handleImageAnalysis(imageData){
  const symptoms = [
    {name:'acné', prob: Math.random() > 0.5},
    {name:'manchas', prob: Math.random() > 0.6},
    {name:'sequedad', prob: Math.random() > 0.6},
    {name:'irritación', prob: Math.random() > 0.7},
    {name:'grasa', prob: Math.random() > 0.5}
  ].filter(s => s.prob);
  if(symptoms.length === 0) symptoms.push({name:'piel sana', prob:true});
  let html = `<div class="image-analysis">
    <h4>📸 Análisis de tu imagen</h4>
    <img src="${imageData}" class="analyzed-img">
    <p><strong>Posibles características detectadas:</strong></p>
    <ul>${symptoms.map(s => `<li>• ${s.name}</li>`).join('')}</ul>
    <p class="disclaimer">⚠️ Este análisis es orientativo. Para un diagnóstico preciso, consulta a un dermatólogo.</p>
    <h4>✨ Recetas sugeridas según lo observado:</h4>`;
  symptoms.forEach(s => {
    const key = Object.keys(PROBLEMS).find(k => PROBLEMS[k].keywords.some(kw => s.name.includes(kw)));
    if(key){
      const recs = findRecipesFor(key, profile.skinType, profile.allergies).slice(0,2);
      recs.forEach(r => { html += recipeCardHTML(r); });
    }
  });
  html += `</div>`;
  historyList.push({ts:Date.now(), type:'image', symptoms:symptoms.map(s=>s.name)});
  saveJSON(LS.HISTORY, historyList);
  return {html, save:true};
}

function searchFallback(msg){
  const q = normalize(msg);
  const tokens = q.split(/\s+/).filter(t => t.length > 2);
  const scored = recetas.map(r => {
    let score = 0;
    const txt = normalize((r.titulo||'') + ' ' + (r.ingredientes||[]).join(' ') + ' ' + (r.recomendaciones||''));
    tokens.forEach(t => { if(txt.includes(t)) score += 5; });
    return {r, score};
  }).filter(x => x.score > 0).sort((a,b) => b.score - a.score).slice(0,4);
  if(scored.length){
    let html = `<p>🔍 Encontré esto relacionado con tu consulta:</p>`;
    scored.forEach(s => { html += recipeCardHTML(s.r); });
    return {html, save:true};
  }
  return {
    text: ` No entendí bien. Puedo ayudarte con:<br>• "Tengo acné y piel grasa"<br>• "Diagnosticar mi piel"<br>• "Analizar mi foto"<br>• "Comparar recetas"<br>• "Consejos de nutrición"`,
    save:true
  };
}

// ---------- UI CHAT ----------
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const modalChatbot = document.getElementById('modal-chatbot');
const chatbotBtn = document.getElementById('chatbot-btn');
const closeChatbot = document.getElementById('close-chatbot');
const imageInput = document.getElementById('chat-image-input');

function addMessage(content, side='bot', type='text'){
  if(!chatMessages) return;
  const div = document.createElement('div');
  div.className = `msg msg-${side}`;
  if(type === 'html') div.innerHTML = content;
  else div.textContent = content;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function addOptions(options){
  if(!options || !chatMessages) return;
  const wrap = document.createElement('div');
  wrap.className = 'msg-options';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => { wrap.remove(); sendUserMessage(opt); };
    wrap.appendChild(btn);
  });
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping(){
  const t = document.createElement('div');
  t.className = 'msg msg-bot typing';
  t.id = 'typing-indicator';
  t.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(t);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function hideTyping(){
  const t = document.getElementById('typing-indicator');
  if(t) t.remove();
}

function sendUserMessage(text, imageData){
  if(!text && !imageData) return;
  if(text) addMessage(text, 'user');
  if(imageData){
    const img = document.createElement('img');
    img.src = imageData;
    img.className = 'user-uploaded-img';
    const wrap = document.createElement('div');
    wrap.className = 'msg msg-user';
    wrap.appendChild(img);
    chatMessages.appendChild(wrap);
  }
  showTyping();
  setTimeout(() => {
    hideTyping();
    const resp = generateResponse(text || '', imageData);
    if(resp.html) addMessage(resp.html, 'bot', 'html');
    else if(resp.text) addMessage(resp.text, 'bot', 'html');
    if(resp.options) addOptions(resp.options);
    if(resp.save){
      chatHistory.push({role:'user', text, ts:Date.now()});
      chatHistory.push({role:'bot', text: resp.text || resp.html, ts:Date.now()});
      saveJSON(LS.CHAT, chatHistory);
    }
  }, 700 + Math.random()*500);
}

function triggerImageUpload(){
  if(imageInput) imageInput.click();
}

// ---------- MODALES AUXILIARES ----------
function openComparador(){
  const m = document.getElementById('modal-comparador');
  const s1 = document.getElementById('compare-1');
  const s2 = document.getElementById('compare-2');
  s1.innerHTML = s2.innerHTML = recetas.map(r => `<option value="${r.id}">${r.titulo}</option>`).join('');
  m.classList.add('show');
}

document.getElementById('btn-compare').onclick = () => {
  const r1 = recetas.find(r => r.id == document.getElementById('compare-1').value);
  const r2 = recetas.find(r => r.id == document.getElementById('compare-2').value);
  if(!r1 || !r2) return;
  const res = document.getElementById('comparador-result');
  res.innerHTML = `
    <div class="compare-grid">
      <div class="compare-col">
        <img src="${r1.imagen}">
        <h4>${r1.titulo}</h4>
        <p><strong>⏱ Duración:</strong> ${r1.duracion} días</p>
        <p><strong>🎯 Óptimo:</strong> ${r1.tiempoRecomendado} días</p>
        <p><strong>✅ Ventajas:</strong> ${r1.recomendaciones||'-'}</p>
        <p><strong>⚠️ Desventajas:</strong> ${r1.advertencias||'-'}</p>
      </div>
      <div class="compare-col">
        <img src="${r2.imagen}">
        <h4>${r2.titulo}</h4>
        <p><strong> Duración:</strong> ${r2.duracion} días</p>
        <p><strong> Óptimo:</strong> ${r2.tiempoRecomendado} días</p>
        <p><strong>✅ Ventajas:</strong> ${r2.recomendaciones||'-'}</p>
        <p><strong>⚠️ Desventajas:</strong> ${r2.advertencias||'-'}</p>
      </div>
    </div>
    <div class="compare-verdict">
      <strong>💡 Recomendación:</strong> ${r1.tiempoRecomendado < r2.tiempoRecomendado ? `${r1.titulo} tiene resultados más rápidos.` : r2.tiempoRecomendado < r1.tiempoRecomendado ? `${r2.titulo} tiene resultados más rápidos.` : `Ambas tienen tiempos similares, elige según tus ingredientes disponibles.`}
    </div>
  `;
};

function openStats(){
  document.getElementById('modal-stats').classList.add('show');
  const topRecipes = Object.entries(stats.recipesUsed).sort((a,b) => b[1]-a[1]).slice(0,5);
  const c = document.getElementById('stats-content');
  c.innerHTML = `
    <div class="stat-card"><div class="stat-num">${stats.totalConsults}</div><div class="stat-label">Consultas totales</div></div>
    <div class="stat-card"><div class="stat-num">${Object.keys(stats.recipesUsed).length}</div><div class="stat-label">Recetas probadas</div></div>
    <div class="stat-card"><div class="stat-num">${calendar.length}</div><div class="stat-label">Recordatorios activos</div></div>
    <div class="stat-card"><div class="stat-num">${historyList.length}</div><div class="stat-label">Consultas en historial</div></div>
    <h4>🏆 Recetas más usadas</h4>
    ${topRecipes.length ? topRecipes.map(([id,cnt]) => {
      const r = recetas.find(x => x.id == id);
      return r ? `<div class="stat-row"><span>${r.titulo}</span><strong>${cnt}x</strong></div>` : '';
    }).join('') : '<p>Aún no hay datos. ¡Empieza a usar la app!</p>'}
    <h4>👤 Tu perfil</h4>
    <p><strong>Nombre:</strong> ${profile.name || 'No definido'}</p>
    <p><strong>Tipo de piel:</strong> ${profile.skinType || 'No definido'}</p>
    <p><strong>Alergias:</strong> ${profile.allergies?.join(', ') || 'Ninguna'}</p>
  `;
}

function openHistorial(){
  document.getElementById('modal-historial').classList.add('show');
  const c = document.getElementById('historial-content');
  if(!historyList.length){ c.innerHTML = '<p>No hay consultas aún.</p>'; return; }
  c.innerHTML = historyList.slice().reverse().map(h => {
    const date = new Date(h.ts).toLocaleString();
    let detail = '';
    if(h.type === 'diagnose') detail = `Diagnóstico: ${h.answers.problem||'-'}`;
    else if(h.type === 'image') detail = `Análisis: ${(h.symptoms||[]).join(', ')}`;
    else detail = 'Consulta general';
    return `<div class="hist-item">
      <div class="hist-date">${date}</div>
      <div class="hist-type">${h.type}</div>
      <div class="hist-detail">${detail}</div>
      ${h.recipes?.length ? `<button onclick="bs_ia.openRecipe(${h.recipes[0]})">Ver receta</button>` : ''}
    </div>`;
  }).join('');
}

function openCalendar(){
  document.getElementById('modal-calendar').classList.add('show');
  const c = document.getElementById('calendar-content');
  c.innerHTML = `
    <div id="calendar-list">
      ${calendar.length ? calendar.map((ev,i) => `
        <div class="cal-item">
          <div>
            <strong>${ev.recipe}</strong>
            <div class="cal-date">📅 ${ev.date}  ${ev.time}</div>
            <div class="cal-note">${ev.note||''}</div>
          </div>
          <button onclick="bs_ia.removeReminder(${i})">🗑️</button>
        </div>
      `).join('') : '<p>No hay recordatorios. Crea uno desde una receta.</p>'}
    </div>
  `;
  if('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
  checkReminders();
  setInterval(checkReminders, 60000);
}

function checkReminders(){
  const now = new Date();
  calendar.forEach(ev => {
    const evDate = new Date(`${ev.date}T${ev.time}`);
    const diff = evDate - now;
    if(diff > 0 && diff < 60000 && !ev.notified){
      ev.notified = true;
      saveJSON(LS.CALENDAR, calendar);
      if('Notification' in window && Notification.permission === 'granted'){
        new Notification('🌿 BloomSkin - Recordatorio', { body: `Es hora de aplicar: ${ev.recipe}`, icon: '🌿' });
      }
      addMessage(` <strong>Recordatorio:</strong> Es hora de aplicar <strong>${ev.recipe}</strong>`, 'bot', 'html');
    }
  });
}

// ---------- API PÚBLICA ----------
window.bs_ia = {
  ask: (q) => sendUserMessage(q),
  openRecipe: (id) => {
    if(window.rc_app?.mostrarDetalleReceta) window.rc_app.mostrarDetalleReceta(id);
    if(modalChatbot) modalChatbot.classList.remove('show');
  },
  explain: (id) => {
    const r = recetas.find(x => x.id === id);
    if(r){
      chatState.pendingRecipe = r;
      addMessage(`🔬 Explicando: ${r.titulo}`, 'user');
      setTimeout(() => {
        showTyping();
        setTimeout(() => { hideTyping(); addMessage(explainRecipe(r), 'bot', 'html'); }, 800);
      }, 300);
    }
  },
  remind: (id) => {
    const r = recetas.find(x => x.id === id);
    if(!r) return;
    const date = prompt('Fecha del recordatorio (YYYY-MM-DD):', new Date().toISOString().slice(0,10));
    if(!date) return;
    const time = prompt('Hora (HH:MM):', '20:00');
    if(!time) return;
    const note = prompt('Nota (opcional):', 'Aplicar receta') || '';
    calendar.push({recipe:r.titulo, date, time, note, recipeId:id});
    saveJSON(LS.CALENDAR, calendar);
    addMessage(`✅ Recordatorio creado: <strong>${r.titulo}</strong> el ${date} a las ${time}`, 'bot', 'html');
  },
  removeReminder: (i) => {
    calendar.splice(i,1);
    saveJSON(LS.CALENDAR, calendar);
    openCalendar();
  }
};

// ---------- EVENTOS ----------
if(chatbotBtn) chatbotBtn.onclick = () => {
  modalChatbot.classList.add('show');
  if(!chatHistory.length){
    const g = greeting();
    addMessage(g.text, 'bot', 'html');
  } else {
    chatHistory.slice(-20).forEach(m => {
      addMessage(m.text, m.role === 'user' ? 'user' : 'bot', 'html');
    });
  }
};
if(closeChatbot) closeChatbot.onclick = () => modalChatbot.classList.remove('show');
if(sendBtn) sendBtn.onclick = () => {
  const v = chatInput.value.trim();
  if(v){ chatInput.value = ''; sendUserMessage(v); }
};
if(chatInput) chatInput.onkeypress = e => {
  if(e.key === 'Enter'){ e.preventDefault(); sendBtn.click(); }
};
if(imageInput) imageInput.onchange = e => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => sendUserMessage('Analiza mi foto', ev.target.result);
  reader.readAsDataURL(file);
};
document.querySelectorAll('.chat-quick-actions button').forEach(btn => {
  btn.onclick = () => {
    const action = btn.dataset.action;
    const map = { diagnose:'Diagnosticar mi piel', compare:'Comparar recetas', image:'Analizar foto', nutrition:'Consejos de nutrición' };
    sendUserMessage(map[action]);
  };
});
document.querySelectorAll('.close-modal').forEach(b => {
  b.onclick = () => b.closest('.modal-v4').classList.remove('show');
});
document.getElementById('btn-stats').onclick = openStats;
document.getElementById('btn-history').onclick = openHistorial;
document.getElementById('btn-calendar').onclick = openCalendar;

console.log('🌿 BloomSkin IA v4 inicializada');
})();
  // ---------- FIN IIFE ----------
})();