export type MapStyleType = "atlas" | "organic" | "hexagon" | "metro";

export interface TerritoryGeometry {
  path: string;
  center: { x: number; y: number };
  innerContour?: string;
  width?: number;
  height?: number;
  extra?: any;
}

function seededJitter(seed: number, amount: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return (x - Math.floor(x) - 0.5) * 2 * amount;
}

export function getAtlasGeometries(count: number, width = 840, height = 540): TerritoryGeometry[] {
  const padX = 36;
  const padY = 32;
  const availW = width - padX * 2;
  const availH = height - padY * 2;

  let rows = 3;
  let colsPerRow: number[] = [];

  if (count === 12) {
    rows = 3;
    colsPerRow = [4, 4, 4];
  } else if (count === 11) {
    rows = 3;
    colsPerRow = [4, 4, 3];
  } else if (count === 10) {
    rows = 3;
    colsPerRow = [3, 4, 3];
  } else if (count === 6) {
    rows = 2;
    colsPerRow = [3, 3];
  } else if (count === 5) {
    rows = 2;
    colsPerRow = [2, 3];
  } else {
    rows = Math.ceil(Math.sqrt(count));
    const perR = Math.ceil(count / rows);
    colsPerRow = Array(rows).fill(perR);
  }

  const rowHeight = availH / rows;
  const items: TerritoryGeometry[] = [];
  let chapterIdx = 0;

  for (let r = 0; r < rows; r++) {
    const numCols = colsPerRow[r] || 3;
    const colWidth = availW / numCols;
    const y0 = padY + r * rowHeight;
    const y1 = y0 + rowHeight;

    for (let c = 0; c < numCols; c++) {
      if (chapterIdx >= count) break;
      const x0 = padX + c * colWidth;
      const x1 = x0 + colWidth;

      const pTL = {
        x: x0 + (c === 0 ? 0 : seededJitter(r * 12 + c, 7)),
        y: y0 + (r === 0 ? 0 : seededJitter(r * 12 + c + 1, 6)),
      };
      const pTR = {
        x: x1 + (c === numCols - 1 ? 0 : seededJitter(r * 12 + c + 2, 7)),
        y: y0 + (r === 0 ? 0 : seededJitter(r * 12 + c + 3, 6)),
      };
      const pBR = {
        x: x1 + (c === numCols - 1 ? 0 : seededJitter(r * 12 + c + 4, 7)),
        y: y1 + (r === rows - 1 ? 0 : seededJitter(r * 12 + c + 5, 6)),
      };
      const pBL = {
        x: x0 + (c === 0 ? 0 : seededJitter(r * 12 + c + 6, 7)),
        y: y1 + (r === rows - 1 ? 0 : seededJitter(r * 12 + c + 7, 6)),
      };

      const cx = (pTL.x + pTR.x + pBR.x + pBL.x) / 4;
      const cy = (pTL.y + pTR.y + pBR.y + pBL.y) / 4;

      const scale = 0.945;
      const shrink = (p: { x: number; y: number }, s = scale) => ({
        x: cx + (p.x - cx) * s,
        y: cy + (p.y - cy) * s,
      });

      const sTL = shrink(pTL);
      const sTR = shrink(pTR);
      const sBR = shrink(pBR);
      const sBL = shrink(pBL);

      const j1 = seededJitter(chapterIdx * 4 + 1, 9);
      const j2 = seededJitter(chapterIdx * 4 + 2, 9);
      const j3 = seededJitter(chapterIdx * 4 + 3, 9);
      const j4 = seededJitter(chapterIdx * 4 + 4, 9);

      const mTop = { x: (sTL.x + sTR.x) / 2, y: (sTL.y + sTR.y) / 2 + j1 };
      const mRight = { x: (sTR.x + sBR.x) / 2 + j2, y: (sTR.y + sBR.y) / 2 };
      const mBottom = { x: (sBR.x + sBL.x) / 2, y: (sBR.y + sBL.y) / 2 + j3 };
      const mLeft = { x: (sBL.x + sTL.x) / 2 + j4, y: (sBL.y + sTL.y) / 2 };

      const path = `M ${Math.round(sTL.x)},${Math.round(sTL.y)} Q ${Math.round(mTop.x)},${Math.round(mTop.y)} ${Math.round(sTR.x)},${Math.round(sTR.y)} Q ${Math.round(mRight.x)},${Math.round(mRight.y)} ${Math.round(sBR.x)},${Math.round(sBR.y)} Q ${Math.round(mBottom.x)},${Math.round(mBottom.y)} ${Math.round(sBL.x)},${Math.round(sBL.y)} Q ${Math.round(mLeft.x)},${Math.round(mLeft.y)} ${Math.round(sTL.x)},${Math.round(sTL.y)} Z`;

      const inTL = shrink(pTL, 0.78);
      const inTR = shrink(pTR, 0.78);
      const inBR = shrink(pBR, 0.78);
      const inBL = shrink(pBL, 0.78);
      const innerContour = `M ${Math.round(inTL.x)},${Math.round(inTL.y)} L ${Math.round(inTR.x)},${Math.round(inTR.y)} L ${Math.round(inBR.x)},${Math.round(inBR.y)} L ${Math.round(inBL.x)},${Math.round(inBL.y)} Z`;

      items.push({
        path,
        center: { x: Math.round(cx), y: Math.round(cy) },
        innerContour,
        width: Math.round(colWidth),
        height: Math.round(rowHeight)
      });
      chapterIdx++;
    }
  }

  return items;
}

export function getOrganicGeometries(count: number, width = 840, height = 540): TerritoryGeometry[] {
  const padX = 40;
  const padY = 36;
  const availW = width - padX * 2;
  const availH = height - padY * 2;

  let rows = count <= 6 ? 2 : 3;
  let colsPerRow: number[] = [];

  if (count === 12) colsPerRow = [4, 4, 4];
  else if (count === 11) colsPerRow = [4, 4, 3];
  else if (count === 10) colsPerRow = [3, 4, 3];
  else if (count === 6) colsPerRow = [3, 3];
  else if (count === 5) colsPerRow = [2, 3];
  else colsPerRow = Array(rows).fill(Math.ceil(count / rows));

  const rowHeight = availH / rows;
  const items: TerritoryGeometry[] = [];
  let currentIndex = 0;

  for (let r = 0; r < rows; r++) {
    const numCols = colsPerRow[r] || 3;
    const colWidth = availW / numCols;
    const y0 = padY + r * rowHeight;

    for (let c = 0; c < numCols; c++) {
      if (currentIndex >= count) break;
      const x0 = padX + c * colWidth;
      const cx = x0 + colWidth / 2;
      const cy = y0 + rowHeight / 2;

      const rx = colWidth * 0.43;
      const ry = rowHeight * 0.38;

      const numPoints = 8;
      const pts: { x: number; y: number }[] = [];
      const innerPts: { x: number; y: number }[] = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const jFactor = 1 + seededJitter(currentIndex * 13 + i * 7, 0.13);
        const px = cx + Math.cos(angle) * rx * jFactor;
        const py = cy + Math.sin(angle) * ry * jFactor;
        pts.push({ x: px, y: py });

        const ipx = cx + Math.cos(angle) * rx * jFactor * 0.72;
        const ipy = cy + Math.sin(angle) * ry * jFactor * 0.72;
        innerPts.push({ x: ipx, y: ipy });
      }

      let path = `M ${Math.round(pts[0].x)},${Math.round(pts[0].y)}`;
      for (let i = 0; i < numPoints; i++) {
        const curr = pts[i];
        const next = pts[(i + 1) % numPoints];
        const cpX = (curr.x + next.x) / 2;
        const cpY = (curr.y + next.y) / 2;
        path += ` Q ${Math.round(curr.x)},${Math.round(curr.y)} ${Math.round(cpX)},${Math.round(cpY)}`;
      }
      path += " Z";

      let innerContour = `M ${Math.round(innerPts[0].x)},${Math.round(innerPts[0].y)}`;
      for (let i = 0; i < numPoints; i++) {
        const curr = innerPts[i];
        const next = innerPts[(i + 1) % numPoints];
        const cpX = (curr.x + next.x) / 2;
        const cpY = (curr.y + next.y) / 2;
        innerContour += ` Q ${Math.round(curr.x)},${Math.round(curr.y)} ${Math.round(cpX)},${Math.round(cpY)}`;
      }
      innerContour += " Z";

      items.push({
        path,
        center: { x: Math.round(cx), y: Math.round(cy) },
        innerContour,
        width: Math.round(rx * 2),
        height: Math.round(ry * 2)
      });
      currentIndex++;
    }
  }

  return items;
}

export function getHexagonGeometries(count: number, width = 840, height = 540): TerritoryGeometry[] {
  let cols = 4;
  let rows = 3;

  if (count <= 6) {
    cols = 3;
    rows = 2;
  } else if (count <= 8) {
    cols = 4;
    rows = 2;
  }

  const hexRadius = count <= 6 ? 110 : count <= 8 ? 92 : 82;
  const hexWidth = Math.sqrt(3) * hexRadius;
  const hexHeight = 2 * hexRadius;
  const vertSpacing = hexHeight * 0.75;

  const spanX = (cols - 0.5) * hexWidth;
  const spanY = (rows - 1) * vertSpacing + hexHeight;
  const startX = (width - spanX) / 2 + hexWidth * 0.25;
  const startY = (height - spanY) / 2 + hexRadius;

  const items: TerritoryGeometry[] = [];
  const gap = 4;

  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;

    const rowOffset = (r % 2 === 1) ? hexWidth / 2 : 0;
    const cx = startX + c * hexWidth + rowOffset;
    const cy = startY + r * vertSpacing;

    let path = "";
    let innerContour = "";

    for (let a = 0; a < 6; a++) {
      const angle = (Math.PI / 3) * a - Math.PI / 6;
      const hx = cx + (hexRadius - gap) * Math.cos(angle);
      const hy = cy + (hexRadius - gap) * Math.sin(angle);
      path += (a === 0 ? "M " : " L ") + `${Math.round(hx)},${Math.round(hy)}`;

      const ihx = cx + (hexRadius - gap - 9) * Math.cos(angle);
      const ihy = cy + (hexRadius - gap - 9) * Math.sin(angle);
      innerContour += (a === 0 ? "M " : " L ") + `${Math.round(ihx)},${Math.round(ihy)}`;
    }
    path += " Z";
    innerContour += " Z";

    items.push({
      path,
      center: { x: Math.round(cx), y: Math.round(cy) },
      innerContour,
      width: Math.round(hexWidth),
      height: Math.round(hexHeight)
    });
  }

  return items;
}

export function getMetroGeometries(count: number, width = 840, height = 540): TerritoryGeometry[] {
  const padX = 55;
  const padY = 48;
  const availW = width - padX * 2;
  const availH = height - padY * 2;

  let cols = 4;
  let rows = 3;
  if (count <= 6) {
    cols = 3;
    rows = 2;
  }

  const colWidth = availW / (cols - 1);
  const rowHeight = availH / (rows - 1);
  const items: TerritoryGeometry[] = [];

  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const isReverseRow = r % 2 === 1;
    const c = isReverseRow ? (cols - 1 - (i % cols)) : (i % cols);

    const cx = padX + c * colWidth;
    const cy = padY + r * rowHeight;

    const rx = 64;
    const ry = 48;
    const corner = 16;

    const x0 = cx - rx;
    const x1 = cx + rx;
    const y0 = cy - ry;
    const y1 = cy + ry;

    const path = `M ${x0 + corner},${y0} L ${x1 - corner},${y0} Q ${x1},${y0} ${x1},${y0 + corner} L ${x1},${y1 - corner} Q ${x1},${y1} ${x1 - corner},${y1} L ${x0 + corner},${y1} Q ${x0},${y1} ${x0},${y1 - corner} L ${x0},${y0 + corner} Q ${x0},${y0} ${x0 + corner},${y0} Z`;

    const ix0 = cx - rx + 6;
    const ix1 = cx + rx - 6;
    const iy0 = cy - ry + 6;
    const iy1 = cy + ry - 6;
    const innerContour = `M ${ix0 + corner - 2},${iy0} L ${ix1 - corner + 2},${iy0} Q ${ix1},${iy0} ${ix1},${iy0 + corner - 2} L ${ix1},${iy1 - corner + 2} Q ${ix1},${iy1} ${ix1 - corner + 2},${iy1} L ${ix0 + corner - 2},${iy1} Q ${ix0},${iy1} ${ix0},${iy1 - corner + 2} L ${ix0},${iy0 + corner - 2} Q ${ix0},${iy0} ${ix0 + corner - 2},${iy0} Z`;

    items.push({
      path,
      center: { x: Math.round(cx), y: Math.round(cy) },
      innerContour,
      width: rx * 2,
      height: ry * 2,
      extra: { stationIndex: i, row: r, col: c },
    });
  }

  return items;
}

export function getMapGeometries(style: MapStyleType, count: number, width = 840, height = 540): TerritoryGeometry[] {
  switch (style) {
    case "atlas":
      return getAtlasGeometries(count, width, height);
    case "organic":
      return getOrganicGeometries(count, width, height);
    case "hexagon":
      return getHexagonGeometries(count, width, height);
    case "metro":
      return getMetroGeometries(count, width, height);
    default:
      return getAtlasGeometries(count, width, height);
  }
}
