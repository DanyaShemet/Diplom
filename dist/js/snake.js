window.onload = function() {
    document.addEventListener('keydown', changeDirection);
    setInterval(loop, 1000/60); 
  } 
  let
    canv 				= document.getElementById('canvas'),
    ctx					= canv.getContext('2d'), 
    gs = fkp			= false, 
    speed = baseSpeed 	= 3, // швидкість змії
    xv = yv				= 0, // координати
    px 					= (canv.width) / 2, // позиція Х
    py 					= (canv.height) / 2, // позиція Y 
    pw = ph				= 20, // розмір зміїї
    aw = ah				= 20, // розмір яблука
    apples				= [],
    trail				= [], // елементи хвоста
    tail 				= 100, // хвіст
    tailSafeZone		= 20, // голова
    cooldown			= false, // 
    score				= 0; // рахунок

  // основна функція
  function loop()
  {
   
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);
  
    // Збільшення позицій задля перевірки
    px += xv;
    py += yv;
    
    // переміщення з крайної точки в протиположну
    if( px > canv.width )
      {px = 0;}
    if( px + pw < 0 )
      {px = canv.width;}
    if( py + ph < 0 )
      {py = canv.height;}
    if( py > canv.height )
      {py = 0;}
  
    // Малювання зміїї
    ctx.fillStyle = 'lime'
    ctx.font = "30px Sanc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    
    for( let i = 0; i < trail.length; i++ )
    {
    
      ctx.fillStyle = trail[i].color || 'lime';
      ctx.fillRect(trail[i].x, trail[i].y, pw, ph);
      
    }
    console.log(trail[1], trail[1]);
    ctx.fillText(score, 50, 50, 100);
    trail.push({x: px, y: py, color: ctx.fillStyle});
  
    // їсть себе
    if( trail.length > tail )
    {
      trail.shift();
    }
    if( trail.length > tail )
    {
      trail.shift();
      score = 0;
    }
  
    // відкусування хвоста
    if( trail.length >= tail && gs )
    {
      for( let i = trail.length - tailSafeZone; i >= 0; i-- )
      {
        if(
          px < (trail[i].x + pw)
          && px + pw > trail[i].x
          && py < (trail[i].y + ph)
          && py + ph > trail[i].y
        )
        {
          tail = 10; // відкусує хвіст
          speed = baseSpeed; // швидкість стає базовою
  
          for( let t = 0; t < trail.length; t++ )
          {
            
            trail[t].color = 'red';
  
            if( t >= trail.length - tail )
              {break;}
          }
        }
      }
    }
  
    // Малюємо яблука
    for( let a = 0; a < apples.length; a++ )
    {
      ctx.fillStyle = apples[a].color;
      ctx.fillRect(apples[a].x, apples[a].y, aw, ah);
    }
  
    
    for( let a = 0; a < apples.length; a++ )
    {
      if(
        px < (apples[a].x + pw)
        && px + pw > apples[a].x
        && py < (apples[a].y + ph)
        && py + ph > apples[a].y
      )
      {
        // З'їла яблуко
        apples.splice(a, 1);
        tail += 10;
        score++;
        speed += .1;
        spawnApple();
        break;
      }
    }
  }
  // спавн яблук
  function spawnApple()
  {
    let
      newApple = {
        x: (Math.random() * canv.width),
        y: (Math.random() * canv.height),
        color: 'red'
      };
  
    // заборонна спавну біля краю
    if(
      (newApple.x < aw || newApple.x > canv.width - aw)
      ||
      (newApple.y < ah || newApple.y > canv.height - ah)
    )
    {
      spawnApple();
      return;
    }
  
    // перевіркка на зіткнення з змією
    for( let i = 0; i < tail.length; i++ )
    {
      if(
        newApple.x < (trail[i].x + pw)
        && newApple.x + aw > trail[i].x
        && newApple.y < (trail[i].y + ph)
        && newApple.y + ah > trail[i].y
      )
      {
        
        spawnApple();
        return true;
      }
    }
    apples.push(newApple);
  
    if( apples.length < 3 && (Math.random() * 1000) > 700 )
    {
      // 30% створення нового яблука   
      spawnApple();
    }
  }
  // перемикач руху
  function changeDirection(e)
  {
    if( !fkp && [37,38,39,40].indexOf(e.keyCode) > -1 )
    {
      setTimeout(function() {gs = true;}, 1000);
      fkp = true;
      spawnApple();
    } 
    // if( cooldown )
    //   {return false;}

    if( e.keyCode == 37 && !(xv > 0) ) // ліворуч
      {xv =- speed; yv = 0;}
  
    if( e.keyCode == 38 && !(yv > 0) ) // вгору
      {xv = 0; yv = -speed;}
  
    if( e.keyCode == 39 && !(xv < 0) ) // праворуч
      {xv = speed; yv = 0;}
  
    if( e.keyCode == 40 && !(yv < 0) ) // вниз
      {xv = 0; yv = speed;}
  
    cooldown = true;
    setTimeout(function() {cooldown = false;}, 100);
  }

