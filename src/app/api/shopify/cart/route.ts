import { NextRequest, NextResponse } from "next/server";
import {
  createStorefrontCart,
  getStorefrontCart,
  addLinesToStorefrontCart,
  updateStorefrontCartLines,
  removeStorefrontCartLines,
} from "../../../../lib/shopify/storefront";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, cartId, lines, lineIds } = body;

    switch (action) {
      case "create": {
        const cart = await createStorefrontCart(lines);
        return NextResponse.json({ success: true, cart });
      }

      case "get": {
        if (!cartId) {
          return NextResponse.json(
            { success: false, error: "cartId is required" },
            { status: 400 }
          );
        }
        const cart = await getStorefrontCart(cartId);
        return NextResponse.json({ success: true, cart });
      }

      case "add": {
        if (!cartId || !lines || lines.length === 0) {
          return NextResponse.json(
            { success: false, error: "cartId and lines are required" },
            { status: 400 }
          );
        }
        const cart = await addLinesToStorefrontCart(cartId, lines);
        return NextResponse.json({ success: true, cart });
      }

      case "update": {
        if (!cartId || !lines || lines.length === 0) {
          return NextResponse.json(
            { success: false, error: "cartId and lines are required" },
            { status: 400 }
          );
        }
        const cart = await updateStorefrontCartLines(cartId, lines);
        return NextResponse.json({ success: true, cart });
      }

      case "remove": {
        if (!cartId || !lineIds || lineIds.length === 0) {
          return NextResponse.json(
            { success: false, error: "cartId and lineIds are required" },
            { status: 400 }
          );
        }
        const cart = await removeStorefrontCartLines(cartId, lineIds);
        return NextResponse.json({ success: true, cart });
      }

      default:
        return NextResponse.json(
          { success: false, error: `Invalid action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Shopify cart operation failed";
    console.error("[Cart API Route Error]:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
