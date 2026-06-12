// ==================== 暗黑系背景扩展包 v3.0 ====================
// 严格遵循《暗黑背景设计提示词规范 v1.0》

(function() {

function drawDarkStars(count, sizeBase, sizeStep, alphaBase, twinkleSpeed) {
  const t = Date.now() / 1000;
  for (let i = 0; i < count; i++) {
    const sx = ((i * 7919 + 123) % 1000) / 1000 * W;
    const sy = ((i * 104729 + 456) % 1000) / 1000 * H;
    const twinkle = twinkleSpeed > 0 ? (alphaBase + (1 - alphaBase) * Math.abs(Math.sin(t * (twinkleSpeed + i * 0.07) + i * 2.1))) : (alphaBase + (i % 5) * 0.1);
    const size = sizeBase + (i % 4) * sizeStep;
    ctx.fillStyle = i % 10 === 0 ? `rgba(180,200,255,${twinkle})` : `rgba(255,255,255,${twinkle})`;
    ctx.beginPath();
    ctx.arc(sx, sy, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const darkBgRenderers = {

  // 1. 星云 — 柔雾旋涡·流星·深空
  bg_dynamic_nebula(heightK) {
    const t = Date.now() / 1000;
    const cx = W * 0.5;
    const cy = H * 0.5;

    // 1. 基底层：深邃但有呼吸感的星空蓝
    ctx.fillStyle = '#02030a';
    ctx.fillRect(0, 0, W, H);

    // 2. 核心视觉：大面积的柔焦色彩星系
    ctx.globalCompositeOperation = 'screen';

    // 星云 A：孔雀蓝深空带
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.015);
    ctx.scale(2.2, 0.7);
    const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.6);
    g1.addColorStop(0, 'rgba(25, 95, 145, 0.45)');
    g1.addColorStop(0.4, 'rgba(15, 35, 75, 0.15)');
    g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g1;
    ctx.beginPath(); ctx.arc(0, 0, W * 0.6, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // 星云 B：梦幻紫红交织气团
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-t * 0.01 + Math.PI / 4);
    ctx.scale(1.8, 0.9);
    const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.5);
    g2.addColorStop(0, 'rgba(110, 30, 95, 0.35)');
    g2.addColorStop(0.5, 'rgba(40, 15, 55, 0.12)');
    g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g2;
    ctx.beginPath(); ctx.arc(0, 0, W * 0.5, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    ctx.globalCompositeOperation = 'source-over';

    // 3. 远景星尘（慢速旋转）
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.012);
    let bgStars = new Path2D();
    for(let i = 0; i < 80; i++) {
      const r = ((i * 137.5) % 600) * Math.min(W, H) / 800;
      const angle = i * 2.4;
      if(Math.sin(t * 2 + i) > -0.5) {
        bgStars.moveTo(Math.cos(angle)*r + 0.8, Math.sin(angle)*r);
        bgStars.arc(Math.cos(angle)*r, Math.sin(angle)*r, 0.8, 0, Math.PI*2);
      }
    }
    ctx.fillStyle = 'rgba(180, 210, 255, 0.5)';
    ctx.fill(bgStars);
    ctx.restore();

    // 近景星（较快旋转，拉开空间深度）
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.025);
    let fgStars = new Path2D();
    for(let i = 0; i < 40; i++) {
      const r = ((i * 213.7) % 800) * Math.min(W, H) / 800;
      const angle = i * 3.1;
      const blink = Math.sin(t * 4 + i) * 0.5 + 0.5;
      fgStars.moveTo(Math.cos(angle)*r + 1.5, Math.sin(angle)*r);
      fgStars.arc(Math.cos(angle)*r, Math.sin(angle)*r, 1.5 * blink, 0, Math.PI*2);
    }
    ctx.fillStyle = 'rgba(230, 245, 255, 0.8)';
    ctx.fill(fgStars);
    ctx.restore();

    // 4. 柔光焦点恒星
    const haloStars = [
      {x: W * 0.25, y: H * 0.15, coreR: 1.5, haloR: 40, color: '200, 230, 255', phase: 0},
      {x: W * 0.75, y: H * 0.25, coreR: 2.0, haloR: 50, color: '255, 200, 230', phase: 2},
      {x: W * 0.65, y: H * 0.80, coreR: 1.2, haloR: 35, color: '180, 240, 255', phase: 4}
    ];

    haloStars.forEach(star => {
      const blink = Math.sin(t * 1.5 + star.phase) * 0.3 + 0.7;
      const halo = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.haloR * blink);
      halo.addColorStop(0, `rgba(${star.color}, 0.6)`);
      halo.addColorStop(0.2, `rgba(${star.color}, 0.15)`);
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(star.x, star.y, star.haloR * blink, 0, Math.PI*2); ctx.fill();

      ctx.fillStyle = `rgba(255, 255, 255, ${blink})`;
      ctx.beginPath(); ctx.arc(star.x, star.y, star.coreR, 0, Math.PI*2); ctx.fill();
    });

    // 5. 极速流星系统
    ctx.save();
    for (let i = 0; i < 3; i++) {
      const mCycle = (t * 0.6 + i * 2.1) % 3.5;
      if (mCycle < 1.0) {
        const sx = (W * 0.6 + Math.sin(i * 15) * W * 0.5);
        const sy = -H * 0.2 + Math.cos(i * 9) * H * 0.4;
        const mX = sx - mCycle * (W * 1.2);
        const mY = sy + mCycle * (W * 1.2);
        const tailLength = 150;

        const meteorGrad = ctx.createLinearGradient(mX, mY, mX + tailLength, mY - tailLength);
        meteorGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        meteorGrad.addColorStop(0.1, 'rgba(130, 200, 255, 0.4)');
        meteorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(mX, mY);
        ctx.lineTo(mX + tailLength, mY - tailLength);
        ctx.stroke();
      }
    }
    ctx.restore();
  },

  // 2. 血月荒原 — 孤寂·压迫·危险
  bg_bloodmoon(heightK) {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#0a0005');
    grad.addColorStop(0.3, '#120208');
    grad.addColorStop(0.6, '#1a0508');
    grad.addColorStop(1, '#080103');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 主光源 — 血月
    ctx.save();
    const mx = W * 0.72, my = H * 0.18, mr = 45;
    const moonGrad = ctx.createRadialGradient(mx, my, mr * 0.1, mx, my, mr);
    moonGrad.addColorStop(0, 'rgba(255,80,40,0.8)');
    moonGrad.addColorStop(0.3, 'rgba(200,30,15,0.4)');
    moonGrad.addColorStop(0.7, 'rgba(120,10,5,0.08)');
    moonGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = moonGrad;
    ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();
    const haloGrad = ctx.createRadialGradient(mx, my, mr, mx, my, mr * 2.8);
    haloGrad.addColorStop(0, 'rgba(150,20,10,0.1)');
    haloGrad.addColorStop(0.5, 'rgba(80,10,5,0.04)');
    haloGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = haloGrad;
    ctx.beginPath(); ctx.arc(mx, my, mr * 2.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // 辅光源 — 地面余烬
    ctx.save();
    const emGrad = ctx.createRadialGradient(W * 0.2, H * 0.85, 5, W * 0.2, H * 0.85, 100);
    emGrad.addColorStop(0, 'rgba(255,100,20,0.08)');
    emGrad.addColorStop(0.5, 'rgba(180,40,5,0.03)');
    emGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = emGrad;
    ctx.beginPath(); ctx.arc(W * 0.2, H * 0.85, 100, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // 中景 — 荒原剪影
    ctx.save();
    ctx.fillStyle = '#060102';
    ctx.beginPath();
    ctx.moveTo(0, H * 0.82);
    ctx.quadraticCurveTo(W * 0.15, H * 0.78, W * 0.3, H * 0.82);
    ctx.quadraticCurveTo(W * 0.5, H * 0.85, W * 0.65, H * 0.8);
    ctx.quadraticCurveTo(W * 0.8, H * 0.76, W, H * 0.81);
    ctx.lineTo(W, H); ctx.lineTo(0, H);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#040101';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W * 0.45, H * 0.82); ctx.lineTo(W * 0.45, H * 0.62);
    ctx.moveTo(W * 0.45, H * 0.7); ctx.lineTo(W * 0.42, H * 0.64);
    ctx.moveTo(W * 0.45, H * 0.66); ctx.lineTo(W * 0.48, H * 0.6);
    ctx.stroke();
    ctx.restore();

    // 近景 — 飘散火星
    const t = Date.now() / 1000;
    ctx.save();
    for (let i = 0; i < 12; i++) {
      const px = ((i * 4231 + t * 4) % W);
      const py = H * 0.5 + ((i * 3719 + t * 6 * (0.3 + i * 0.05)) % (H * 0.4));
      const pa = 0.12 + 0.1 * Math.sin(t * 1.5 + i * 1.3);
      const pGrad = ctx.createRadialGradient(px, py, 0, px, py, 3);
      pGrad.addColorStop(0, `rgba(255,120,30,${pa})`);
      pGrad.addColorStop(1, 'rgba(200,40,0,0)');
      ctx.fillStyle = pGrad;
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // 雾气
    ctx.save();
    const fogGrad = ctx.createRadialGradient(W * 0.5, H * 0.75, 20, W * 0.5, H * 0.75, W * 0.5);
    fogGrad.addColorStop(0, 'rgba(40,8,5,0.08)');
    fogGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  },

  // 2. 毒沼 — 腐败·窒息·原始
  bg_swamp(heightK) {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#030805');
    grad.addColorStop(0.3, '#051008');
    grad.addColorStop(0.6, '#071508');
    grad.addColorStop(1, '#040a05');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const t = Date.now() / 1000;
    const waterY = H * 0.72;

    // 主光源 — 沼气光（增强）
    ctx.save();
    const sx = W * 0.5 + Math.sin(t * 0.15) * 15;
    const sy = H * 0.6;
    const sGrad = ctx.createRadialGradient(sx, sy, 5, sx, sy, 120);
    const sPulse = 0.15 + 0.06 * Math.sin(t * 1.2);
    sGrad.addColorStop(0, `rgba(60,180,30,${sPulse})`);
    sGrad.addColorStop(0.4, `rgba(30,100,15,${sPulse * 0.4})`);
    sGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sGrad;
    ctx.beginPath(); ctx.arc(sx, sy, 120, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // 辅光源 — 磷火群（增强）
    ctx.save();
    for (let i = 0; i < 6; i++) {
      const fx = W * (0.1 + i * 0.15) + Math.sin(t * 0.3 + i * 2) * 15;
      const fy = H * (0.3 + i * 0.07) + Math.cos(t * 0.4 + i * 1.5) * 12;
      const fAlpha = 0.12 + 0.06 * Math.sin(t * 1.5 + i * 2);
      const fGrad = ctx.createRadialGradient(fx, fy, 1, fx, fy, 25);
      fGrad.addColorStop(0, `rgba(120,255,50,${fAlpha})`);
      fGrad.addColorStop(0.5, `rgba(60,180,20,${fAlpha * 0.4})`);
      fGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fGrad;
      ctx.beginPath(); ctx.arc(fx, fy, 25, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // 水面
    ctx.save();
    const wGrad = ctx.createLinearGradient(0, waterY, 0, H);
    wGrad.addColorStop(0, 'rgba(8,30,12,0.35)');
    wGrad.addColorStop(1, 'rgba(4,15,6,0.5)');
    ctx.fillStyle = wGrad;
    ctx.fillRect(0, waterY, W, H - waterY);
    // 波纹（增强）
    ctx.strokeStyle = 'rgba(40,100,40,0.15)';
    ctx.lineWidth = 1.0;
    for (let i = 0; i < 6; i++) {
      const ry = waterY + 5 + i * 8;
      ctx.beginPath();
      for (let x = 0; x < W; x += 4) {
        const y = ry + Math.sin(x * 0.025 + t * 1.2 + i * 0.8) * 3;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();

    // 毒气泡（大幅增强：更大、更亮、更多）
    ctx.save();
    for (let i = 0; i < 16; i++) {
      const bx = W * (0.05 + i * 0.06);
      const by = waterY + 10 - ((i * 2719 + t * 5) % (H * 0.3));
      const br = 3 + (i % 5) * 2;
      const ba = 0.2 + 0.1 * Math.sin(t * 2 + i);
      // 气泡外圈
      ctx.strokeStyle = `rgba(80,200,40,${ba})`;
      ctx.lineWidth = 1.0;
      ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.stroke();
      // 气泡内高光
      const hGrad = ctx.createRadialGradient(bx - br * 0.3, by - br * 0.3, 0, bx, by, br);
      hGrad.addColorStop(0, `rgba(120,255,60,${ba * 0.4})`);
      hGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = hGrad;
      ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // 毒雾层（增强）
    ctx.save();
    for (let i = 0; i < 4; i++) {
      const fogX = W * (0.15 + i * 0.25) + Math.sin(t * 0.1 + i * 2) * 30;
      const fogY = H * (0.5 + i * 0.08) + Math.cos(t * 0.08 + i * 1.5) * 20;
      const fogGrad = ctx.createRadialGradient(fogX, fogY, 10, fogX, fogY, 130);
      fogGrad.addColorStop(0, 'rgba(40,90,20,0.10)');
      fogGrad.addColorStop(0.5, 'rgba(20,50,10,0.05)');
      fogGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, W, H);
    }
    ctx.restore();

    // 水面反光点（增强）
    ctx.save();
    for (let i = 0; i < 10; i++) {
      const rx = W * (0.08 + i * 0.09);
      const ry = waterY + 3 + (i % 3) * 8;
      const ra = 0.12 + 0.06 * Math.sin(t * 2 + i * 1.5);
      ctx.fillStyle = `rgba(100,220,50,${ra})`;
      ctx.beginPath(); ctx.arc(rx, ry, 1.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  },

  // 3. 霓虹雨窗 — 橘红冷蓝对冲·高楼落地窗
  bg_frosted_neon_rain(heightK) {
   const t = Date.now() / 1000;
   const nb = typeof neonBrightness !== 'undefined' ? neonBrightness : 1.0;

   // 1. 铺设深夜基底（暗而不黑，带有深夜特有的深蓝紫调）
   ctx.fillStyle = '#030611';
   ctx.fillRect(0, 0, W, H);

   // 2. 霓虹光晕（橘红左+冷蓝右+白炽中下）
   ctx.save();
   // 【左侧 — 炽热的橘红霓虹巨幕】
   const pulseLeft = Math.sin(t * 0.7) * 0.06 + 0.94;
   const neonLeft = ctx.createRadialGradient(W * 0.15, H * 0.25, 0, W * 0.15, H * 0.25, W * 0.6);
   neonLeft.addColorStop(0, `rgba(235, 50, 15, ${0.48 * pulseLeft * nb})`);
   neonLeft.addColorStop(0.35, `rgba(160, 25, 20, ${0.22 * pulseLeft * nb})`);
   neonLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
   ctx.fillStyle = neonLeft;
   ctx.fillRect(0, 0, W, H);

   // 【右侧 — 深邃的霓虹冷蓝】
   const pulseRight = Math.cos(t * 0.8) * 0.05 + 0.95;
   const neonRight = ctx.createRadialGradient(W * 0.9, H * 0.5, 0, W * 0.9, H * 0.5, W * 0.55);
   neonRight.addColorStop(0, `rgba(15, 65, 240, ${0.52 * pulseRight * nb})`);
   neonRight.addColorStop(0.4, `rgba(8, 30, 130, ${0.18 * pulseRight * nb})`);
   neonRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
   ctx.fillStyle = neonRight;
   ctx.fillRect(0, 0, W, H);

   // 【中下部 — 车灯/路灯的强白炽光散射】
   const neonCenter = ctx.createRadialGradient(W * 0.42, H * 0.65, 0, W * 0.42, H * 0.65, W * 0.38);
   neonCenter.addColorStop(0, `rgba(215, 240, 255, ${0.38 * nb})`);
   neonCenter.addColorStop(0.3, `rgba(80, 145, 210, ${0.12 * nb})`);
   neonCenter.addColorStop(1, 'rgba(0, 0, 0, 0)');
   ctx.fillStyle = neonCenter;
   ctx.fillRect(0, 0, W, H);
   ctx.restore();

   // 3. 毛玻璃哈气雾化层
   ctx.save();
   ctx.fillStyle = `rgba(15, 22, 38, ${0.22 * nb})`;
   ctx.fillRect(0, 0, W, H);
   ctx.restore();

   // 4. 玻璃表面密布的静止冷凝小水珠（Path2D批处理，35个仅3次渲染调用）
   ctx.save();
   let staticShadow = new Path2D();
   let staticBody = new Path2D();
   let staticGlow = new Path2D();

   for (let i = 0; i < 35; i++) {
     const rx = (i * 197.3) % (W - 30) + 15;
     const ry = (i * 113.9) % (H - 30) + 15;
     const r = 1.5 + (i % 4) * 0.7;

     staticShadow.moveTo(rx + r, ry + 0.5);
     staticShadow.arc(rx, ry + 0.5, r, 0, Math.PI * 2);

     staticBody.moveTo(rx + r * 0.85, ry);
     staticBody.arc(rx, ry, r * 0.85, 0, Math.PI * 2);

     staticGlow.moveTo(rx - r * 0.1, ry - r * 0.2);
     staticGlow.arc(rx - r * 0.2, ry - r * 0.2, r * 0.22, 0, Math.PI * 2);
   }
   ctx.lineWidth = 0.5;
   ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';      ctx.stroke(staticShadow);
   ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';  ctx.fill(staticBody);
   ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';  ctx.fill(staticGlow);
   ctx.restore();

   // 5. 顺着玻璃缓缓流淌的动态水滴（6个，区域色彩映射）
   ctx.save();
   for (let i = 0; i < 6; i++) {
     const startX = (i * 163.7) % (W - 80) + 40;
     const speed = 45 + (i % 3) * 20;

     const baseY = (i * 311.5 + t * speed) % (H + 160) - 80;
     const dropY = baseY + Math.sin(baseY * 0.06) * 10;

     if (dropY > -20 && dropY < H + 20) {
       const rw = 2.8 + (i % 2) * 1.0;
       const rh = rw * (1.4 + Math.sin(t * 5 + i) * 0.15);

       // 水痕
       ctx.beginPath();
       ctx.moveTo(startX, Math.max(0, dropY - 140));
       ctx.lineTo(startX, dropY);
       ctx.lineWidth = rw * 2.2;
       ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
       ctx.stroke();

       // 区域色彩映射：左侧吸橘红，右侧吸冷蓝
       let dropHighlight = 'rgba(255, 255, 255, 0.6)';
       if (startX < W * 0.38) {
         dropHighlight = 'rgba(255, 120, 90, 0.55)';
       } else if (startX > W * 0.68) {
         dropHighlight = 'rgba(110, 170, 255, 0.6)';
       }

       // 阴影
       ctx.beginPath();
       ctx.ellipse(startX, dropY + 1, rw, rh, 0, 0, Math.PI * 2);
       ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
       ctx.fill();

       // 折射体
       ctx.beginPath();
       ctx.ellipse(startX, dropY, rw * 0.85, rh * 0.85, 0, 0, Math.PI * 2);
       ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
       ctx.fill();

       // 高光
       ctx.beginPath();
       ctx.arc(startX - rw * 0.2, dropY - rh * 0.2, rw * 0.35, 0, Math.PI * 2);
       ctx.fillStyle = dropHighlight;
       ctx.fill();
     }
   }
   ctx.restore();
  },

  // 5. 海底世界 — 珊瑚·鱼群·海葵
  bg_ocean(heightK) {
    const t = Date.now() / 1000;

    // 1. 底色 - 深海渐变
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#001f3f');
    grad.addColorStop(0.3, '#003366');
    grad.addColorStop(0.6, '#004080');
    grad.addColorStop(1, '#001a33');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 2. 光线从水面射入（体积光）
    ctx.save();
    ctx.globalAlpha = 0.15 + Math.sin(t * 0.5) * 0.05;
    for (let i = 0; i < 5; i++) {
      const x = (i / 4) * W;
      ctx.beginPath();
      ctx.moveTo(x - 50, 0);
      ctx.lineTo(x + 50, 0);
      ctx.lineTo(x + 100, H * 0.6);
      ctx.lineTo(x - 100, H * 0.6);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + Math.sin(t + i) * 0.01})`;
      ctx.fill();
    }
    ctx.restore();

    // 3. 气泡上升（20个，确定性循环）
    ctx.save();
    for (let i = 0; i < 20; i++) {
      const bx = (i * 173.3) % W;
      const speed = 0.3 + (i % 5) * 0.15;
      const by = H - ((i * 85 + t * speed * 60) % (H + 40));
      const wobbleX = bx + Math.sin(t * 1.2 + i * 0.7) * 12;
      const br = 2 + (i % 4) * 1.5;
      const bGrad = ctx.createRadialGradient(wobbleX, by, 0, wobbleX, by, br);
      bGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      bGrad.addColorStop(0.5, 'rgba(200, 230, 255, 0.15)');
      bGrad.addColorStop(1, 'rgba(100, 180, 255, 0)');
      ctx.fillStyle = bGrad;
      ctx.beginPath(); ctx.arc(wobbleX, by, br, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // 4. 珊瑚礁（底部，8个）
    ctx.save();
    for (let i = 0; i < 8; i++) {
      const cx = (i / 7) * W;
      const ch = 60 + (i % 4) * 25;
      const sway = Math.sin(t + i) * 5;
      const type = i % 3;
      if (type === 0) {
        // 分叉珊瑚
        ctx.fillStyle = `hsl(${340 + i * 10}, 70%, ${35 + Math.sin(t * 2 + i) * 5}%)`;
        ctx.beginPath();
        ctx.moveTo(cx, H);
        ctx.quadraticCurveTo(cx - 20 + sway, H - ch/2, cx - 30, H - ch);
        ctx.quadraticCurveTo(cx - 10, H - ch/2, cx, H);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx, H);
        ctx.quadraticCurveTo(cx + 25 + sway, H - ch/2, cx + 35, H - ch * 0.8);
        ctx.quadraticCurveTo(cx + 15, H - ch/2, cx, H);
        ctx.fill();
      } else if (type === 1) {
        // 扇形珊瑚
        ctx.fillStyle = `hsl(${200 + i * 15}, 60%, ${40 + Math.cos(t * 1.5 + i) * 5}%)`;
        ctx.beginPath();
        ctx.arc(cx, H, ch * 0.8, Math.PI, Math.PI * 1.6 + sway * 0.05);
        ctx.fill();
      } else {
        // 蘑菇珊瑚
        ctx.fillStyle = `hsl(${30 + i * 20}, 80%, ${45 + Math.sin(t * 3 + i) * 5}%)`;
        ctx.beginPath();
        ctx.arc(cx + sway, H - ch * 0.6, ch * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(cx - 10 + sway, H - ch * 0.6, 20, ch * 0.6);
      }
    }
    ctx.restore();

    // 5. 海葵（1个，右侧）
    ctx.save();
    const anemoneX = W * 0.7;
    const anemoneY = H - 80;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const length = 40 + Math.sin(t * 3 + i) * 10;
      const endX = anemoneX + Math.cos(angle) * length;
      const endY = anemoneY + Math.sin(angle) * length * 0.6;
      ctx.strokeStyle = `hsla(${15 + i * 3}, 90%, ${55 + Math.sin(t * 2 + i) * 10}%, ${0.7 + Math.sin(t + i) * 0.2})`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(anemoneX, anemoneY);
      ctx.quadraticCurveTo(
        anemoneX + Math.cos(angle) * length * 0.5 + Math.sin(t * 4 + i) * 5,
        anemoneY + Math.sin(angle) * length * 0.3,
        endX, endY
      );
      ctx.stroke();
    }
    const aGrad = ctx.createRadialGradient(anemoneX, anemoneY, 0, anemoneX, anemoneY, 35);
    aGrad.addColorStop(0, '#ff9a56');
    aGrad.addColorStop(1, '#ff6b35');
    ctx.fillStyle = aGrad;
    ctx.beginPath(); ctx.arc(anemoneX, anemoneY, 30, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // 6. 鱼群（10条，确定性循环）
    ctx.save();
    const fishColors = ['#ff6b35', '#f7931e', '#ffd23f', '#ee4266', '#540d6e'];
    for (let i = 0; i < 10; i++) {
      const speed = 0.5 + (i % 3) * 0.4;
      const direction = (i % 2 === 0) ? 1 : -1;
      let fx = (i * 183.7 + t * speed * 60 * direction) % (W + 100) - 50;
      if (direction === -1) fx = W - fx;
      const fy = (i * 73.1 + Math.sin(t * 1.2 + i) * 25) % (H * 0.7) + H * 0.1;
      const size = 8 + (i % 3) * 4;
      const alpha = 0.5 + (i % 3) * 0.15;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = fishColors[i % 5];
      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(direction === -1 ? Math.PI : 0);
      // 身体
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // 尾巴
      const tailWag = Math.sin(t * 5 + i) * 0.3;
      ctx.beginPath();
      ctx.moveTo(-size * 0.8, 0);
      ctx.lineTo(-size * 1.5, -size * 0.4 + tailWag * size);
      ctx.lineTo(-size * 1.5, size * 0.4 + tailWag * size);
      ctx.closePath();
      ctx.fill();
      // 眼睛
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(size * 0.4, -size * 0.15, size * 0.15, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(size * 0.45, -size * 0.15, size * 0.08, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    ctx.restore();

    // 7. 更多海洋生物
    ctx.save();
    // 海龟（1只，缓慢游动）
    const turtleX = (t * 20) % (W + 100) - 50;
    const turtleY = H * 0.3 + Math.sin(t * 0.5) * 15;
    const turtleFlip = Math.sin(t * 2) * 0.15;
    // 龟壳
    ctx.fillStyle = 'rgba(60, 120, 50, 0.6)';
    ctx.beginPath();
    ctx.ellipse(turtleX, turtleY, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    // 龟壳花纹
    ctx.strokeStyle = 'rgba(40, 80, 35, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(turtleX, turtleY, 10, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(turtleX - 15, turtleY); ctx.lineTo(turtleX + 15, turtleY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(turtleX, turtleY - 12); ctx.lineTo(turtleX, turtleY + 12); ctx.stroke();
    // 头
    ctx.fillStyle = 'rgba(80, 140, 60, 0.6)';
    ctx.beginPath(); ctx.ellipse(turtleX + 22, turtleY, 7, 5, 0, 0, Math.PI * 2); ctx.fill();
    // 鳍
    ctx.fillStyle = 'rgba(70, 130, 55, 0.5)';
    ctx.save(); ctx.translate(turtleX - 10, turtleY - 12); ctx.rotate(-0.5 + turtleFlip); ctx.beginPath(); ctx.ellipse(0, 0, 12, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(turtleX - 10, turtleY + 12); ctx.rotate(0.5 - turtleFlip); ctx.beginPath(); ctx.ellipse(0, 0, 12, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();

    // 海星（3个，底部）
    for (let i = 0; i < 3; i++) {
      const sx = (0.2 + i * 0.3) * W;
      const sy = H - 30 - i * 10;
      const sSize = 8 + i * 2;
      ctx.fillStyle = `hsla(${350 + i * 20}, 70%, 55%, 0.5)`;
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const angle = (a * 72 - 90) * Math.PI / 180;
        const innerAngle = ((a * 72 + 36) - 90) * Math.PI / 180;
        const ox = sx + Math.cos(angle) * sSize;
        const oy = sy + Math.sin(angle) * sSize;
        const ix = sx + Math.cos(innerAngle) * sSize * 0.4;
        const iy = sy + Math.sin(innerAngle) * sSize * 0.4;
        if (a === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        ctx.lineTo(ix, iy);
      }
      ctx.closePath();
      ctx.fill();
    }

    // 水母（2只，缓慢漂浮）
    for (let i = 0; i < 2; i++) {
      const jx = (0.3 + i * 0.4) * W + Math.sin(t * 0.4 + i * 3) * 25;
      const jy = H * (0.15 + i * 0.2) + Math.sin(t * 0.6 + i) * 15;
      const jsize = 10 + i * 4;
      const jpulse = Math.sin(t * 2.5 + i) * 0.2 + 0.8;
      // 伞盖
      const jGrad = ctx.createRadialGradient(jx, jy, 0, jx, jy, jsize);
      jGrad.addColorStop(0, `rgba(200, 150, 255, ${0.3 * jpulse})`);
      jGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = jGrad;
      ctx.beginPath();
      ctx.ellipse(jx, jy, jsize, jsize * 0.5 * jpulse, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      // 触须
      ctx.strokeStyle = `rgba(180, 130, 255, ${0.12 * jpulse})`;
      ctx.lineWidth = 0.8;
      for (let t2 = 0; t2 < 4; t2++) {
        const tx = jx - jsize * 0.5 + t2 * jsize * 0.33;
        ctx.beginPath();
        ctx.moveTo(tx, jy);
        ctx.quadraticCurveTo(tx + Math.sin(t * 3 + t2 + i) * 6, jy + jsize * 0.6, tx + Math.sin(t * 2 + t2) * 4, jy + jsize * 1.2);
        ctx.stroke();
      }
    }
    ctx.restore();

    // 8. 水面波光（顶部）
    ctx.save();
    ctx.globalAlpha = 0.1 + Math.sin(t * 2) * 0.05;
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 10; i++) {
      const x = (i / 9) * W + Math.sin(t + i) * 20;
      ctx.beginPath();
      ctx.ellipse(x, 20, 40, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  },

  // 6. 深海 — 丁达尔光·水草·浮游
  bg_undersea(heightK) {
    const time = Date.now() / 1000;
    const breath = Math.sin(time * 0.4) * 0.5 + 0.5;

    // 1. 底色：四段深海渐变
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#020a1a');
    grad.addColorStop(0.25, '#031225');
    grad.addColorStop(0.55, '#041830');
    grad.addColorStop(1, '#051020');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 2. 远景：模糊水纹/光斑
    ctx.save();
    ctx.globalAlpha = 0.04 + breath * 0.03;
    for (let i = 0; i < 6; i++) {
      const nx = ((Math.sin(i * 127.1) * 43758.5453 % 1 + 1) % 1) * W * 1.5 - W * 0.25;
      const ny = ((Math.sin(i * 311.7) * 43758.5453 % 1 + 1) % 1) * H * 0.6;
      const nr = 30 + i * 15;
      const rg = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
      rg.addColorStop(0, 'rgba(20, 80, 120, 0.3)');
      rg.addColorStop(1, 'rgba(20, 80, 120, 0)');
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(nx + Math.sin(time * 0.1 + i) * 20, ny, nr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 3. 主光源：丁达尔光柱
    ctx.save();
    const lightX = W * 0.35 + Math.sin(time * 0.15) * W * 0.15;
    const lightW = W * 0.25 + Math.sin(time * 0.2) * W * 0.05;
    const beamGrad = ctx.createLinearGradient(lightX - lightW/2, 0, lightX + lightW/2, 0);
    beamGrad.addColorStop(0, 'rgba(0,0,0,0)');
    beamGrad.addColorStop(0.3, 'rgba(40, 120, 160, 0.08)');
    beamGrad.addColorStop(0.5, 'rgba(60, 160, 200, 0.12)');
    beamGrad.addColorStop(0.7, 'rgba(40, 120, 160, 0.08)');
    beamGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = beamGrad;
    ctx.fillRect(lightX - lightW/2, 0, lightW, H * 0.85);
    // 光柱底部扩散
    const floorLight = ctx.createRadialGradient(lightX, H * 0.82, 0, lightX, H * 0.82, lightW * 0.8);
    floorLight.addColorStop(0, 'rgba(50, 140, 180, 0.15)');
    floorLight.addColorStop(1, 'rgba(50, 140, 180, 0)');
    ctx.fillStyle = floorLight;
    ctx.beginPath();
    ctx.ellipse(lightX, H * 0.88, lightW * 0.7, H * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. 辅光源：海底热液微光
    ctx.save();
    ctx.globalAlpha = 0.03 + breath * 0.02;
    const ventX = W * 0.75 + Math.sin(time * 0.12) * W * 0.08;
    const ventGlow = ctx.createRadialGradient(ventX, H * 0.92, 0, ventX, H * 0.92, W * 0.18);
    ventGlow.addColorStop(0, 'rgba(180, 100, 60, 0.4)');
    ventGlow.addColorStop(0.5, 'rgba(120, 60, 40, 0.15)');
    ventGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ventGlow;
    ctx.fillRect(ventX - W * 0.18, H * 0.65, W * 0.36, H * 0.35);
    ctx.restore();

    // 5. 鱼群（8条，远景暗+近景亮）
    ctx.save();
    // 远景鱼
    ctx.fillStyle = 'rgba(30, 70, 90, 0.35)';
    for (let i = 0; i < 4; i++) {
      const speed = 0.3 + (i % 3) * 0.15;
      const direction = (i % 2 === 0) ? 1 : -1;
      let fx = ((time * speed * 0.3 + i * 2.1) % 2.4) - 0.2;
      const x = fx * W * direction;
      const y = (0.2 + i * 0.15) * H + Math.sin(time * 0.5 + i) * 15;
      const sz = 6 + i * 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - sz * direction, y - sz * 0.4);
      ctx.lineTo(x - sz * direction, y + sz * 0.4);
      ctx.closePath();
      ctx.fill();
    }
    // 近景鱼
    ctx.fillStyle = 'rgba(80, 160, 180, 0.55)';
    for (let i = 4; i < 8; i++) {
      const speed = 0.3 + (i % 3) * 0.2;
      const direction = (i % 2 === 0) ? 1 : -1;
      let fx = ((time * speed * 0.5 + i * 1.7) % 2.4) - 0.2;
      const x = fx * W * direction;
      const y = (0.3 + (i - 4) * 0.12) * H + Math.sin(time * 0.7 + i) * 20;
      const sz = 10 + (i % 3) * 4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - sz * direction, y - sz * 0.45);
      ctx.lineTo(x - sz * direction, y + sz * 0.45);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 6. 上升气泡（25个）
    ctx.save();
    for (let i = 0; i < 25; i++) {
      const bx = (i * 157.3) % W;
      const speed = 0.3 + (i % 5) * 0.15;
      const by = H - ((i * 85 + time * speed * 60) % (H + 40));
      const wobbleX = bx + Math.sin(time * 1.2 + i * 0.9) * 15;
      const br = 1 + (i % 4) * 1.2;
      const alpha = Math.min(0.1 + 0.1 * ((1 - by / H) + 0.3), 0.35);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(140, 210, 230, 0.6)';
      ctx.beginPath(); ctx.arc(wobbleX, by, br, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath(); ctx.arc(wobbleX - br * 0.3, by - br * 0.3, br * 0.25, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // 7. 深海游动生物（水母+鮟鱇鱼+鳗鱼）
    ctx.save();
    // 水母（3只，缓慢漂浮）
    for (let i = 0; i < 3; i++) {
      const jx = (0.2 + i * 0.3) * W + Math.sin(time * 0.3 + i * 2) * 30;
      const jy = (0.2 + i * 0.2) * H + Math.sin(time * 0.5 + i) * 20;
      const jsize = 12 + i * 5;
      const pulse = Math.sin(time * 2 + i) * 0.2 + 0.8;
      // 伞盖
      const jGrad = ctx.createRadialGradient(jx, jy, 0, jx, jy, jsize);
      jGrad.addColorStop(0, `rgba(180, 120, 255, ${0.25 * pulse})`);
      jGrad.addColorStop(0.6, `rgba(120, 80, 200, ${0.12 * pulse})`);
      jGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = jGrad;
      ctx.beginPath();
      ctx.ellipse(jx, jy, jsize, jsize * 0.6 * pulse, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      // 触须
      ctx.strokeStyle = `rgba(160, 100, 240, ${0.15 * pulse})`;
      ctx.lineWidth = 1;
      for (let t2 = 0; t2 < 5; t2++) {
        const tx = jx - jsize * 0.6 + t2 * jsize * 0.3;
        ctx.beginPath();
        ctx.moveTo(tx, jy);
        ctx.quadraticCurveTo(tx + Math.sin(time * 3 + t2 + i) * 8, jy + jsize * 0.8, tx + Math.sin(time * 2 + t2) * 5, jy + jsize * 1.5);
        ctx.stroke();
      }
    }

    // 鮟鱇鱼（1条，带发光诱饵）
    const angX = W * 0.8 + Math.sin(time * 0.2) * 40;
    const angY = H * 0.6 + Math.cos(time * 0.3) * 20;
    const angDir = -1;
    // 发光诱饵
    const lureGlow = ctx.createRadialGradient(angX, angY - 25, 0, angX, angY - 25, 20);
    lureGlow.addColorStop(0, `rgba(100, 255, 180, ${0.4 + Math.sin(time * 3) * 0.2})`);
    lureGlow.addColorStop(0.5, 'rgba(60, 200, 140, 0.1)');
    lureGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = lureGlow;
    ctx.beginPath(); ctx.arc(angX, angY - 25, 20, 0, Math.PI * 2); ctx.fill();
    // 诱饵线
    ctx.strokeStyle = 'rgba(80, 200, 150, 0.2)';
    ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(angX + 8 * angDir, angY - 5); ctx.quadraticCurveTo(angX, angY - 15, angX, angY - 25); ctx.stroke();
    // 鱼身
    ctx.fillStyle = 'rgba(40, 50, 60, 0.7)';
    ctx.beginPath(); ctx.ellipse(angX, angY, 18, 12, 0, 0, Math.PI * 2); ctx.fill();
    // 大嘴
    ctx.fillStyle = 'rgba(20, 20, 30, 0.8)';
    ctx.beginPath(); ctx.arc(angX - 16 * angDir, angY + 2, 8, 0, Math.PI * 2); ctx.fill();
    // 牙齿
    ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
    for (let t2 = 0; t2 < 4; t2++) {
      const ty = angY - 4 + t2 * 2.5;
      ctx.fillRect(angX - 22 * angDir, ty, 3, 1.5);
    }



    // 8. 浮游生物微粒（40个）
    ctx.save();
    ctx.fillStyle = 'rgba(100, 180, 200, 0.15)';
    for (let i = 0; i < 40; i++) {
      const px = ((Math.sin(i * 127.1 + Math.floor(time * 2) * 74.7) * 43758.5453 % 1 + 1) % 1) * W;
      const py = ((Math.sin(i * 311.7 + Math.floor(time * 2) * 74.7) * 43758.5453 % 1 + 1) % 1) * H;
      const ps = 1 + (i % 3);
      ctx.globalAlpha = 0.1 + (i % 5) * 0.04;
      ctx.fillRect(px, py, ps, ps);
    }
    ctx.restore();
  }

};

Object.assign(bgRenderers, darkBgRenderers);

const darkBgThemes = [
  { id: 'bg_frosted_neon_rain', name: '霓虹雨窗', icon: '🌃' },
  { id: 'bg_undersea', name: '深海', icon: '🌊' },
  { id: 'bg_dynamic_nebula', name: '星云', icon: '🌌' },
  { id: 'bg_swamp', name: '毒沼', icon: '☠️' },
  { id: 'bg_bloodmoon', name: '血月荒原', icon: '🌑' },
  { id: 'bg_ocean', name: '海底世界', icon: '🐠' },
];
themeData.bg.push(...darkBgThemes);

})();
