"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft } from "lucide-react";
import type { Member, Committee, YoshlarGuruhi } from "@/lib/data-store";

function norm(s: string | undefined | null): string {
  if (!s) return "";
  return s.toLowerCase().replace(/[''ʼ']/g, "'").trim();
}

// Har bir SVG region ID uchun aniq kalit so'zlar
const REGION_KEYWORDS: Record<string, (r: string) => boolean> = {
  karakalpakstan: (r) => norm(r).includes("qoraqalpog") || norm(r).includes("karakalpak"),
  xorazm:        (r) => norm(r).includes("xorazm"),
  navoiy:        (r) => norm(r).includes("navoiy"),
  buxoro:        (r) => norm(r).includes("buxoro"),
  samarqand:     (r) => norm(r).includes("samarqand"),
  qashqadaryo:   (r) => norm(r).includes("qashqadaryo"),
  surxondaryo:   (r) => norm(r).includes("surxondaryo"),
  jizzax:        (r) => norm(r).includes("jizzax"),
  sirdaryo:      (r) => norm(r).includes("sirdaryo"),
  namangan:      (r) => norm(r).includes("namangan"),
  fargona:       (r) => norm(r).includes("farg"),
  andijon:       (r) => norm(r).includes("andijon"),
  // Toshkent shahri: "shahar" yoki "sh." bor, lekin "viloyat" yo'q
  "toshkent-shahri":   (r) => norm(r).includes("toshkent") && (norm(r).includes("shahar") || norm(r).includes("sh.")) && !norm(r).includes("viloyat"),
  // Toshkent viloyati: "viloyat" bor
  "toshkent-viloyati": (r) => norm(r).includes("toshkent") && norm(r).includes("viloyat"),
};

function getMembersForRegion(regionId: string, members: Member[]): Member[] {
  const matcher = REGION_KEYWORDS[regionId];
  if (!matcher) return [];
  return members.filter((m) => m && m.region != null && matcher(m.region));
}

const YOSHLAR_GURUHI_KEYS: Record<string, string> = {
  ozlidep: "O'zLiDeP yoshlar guruhi",
  milliy: "Milliy tiklanish yoshlar guruhi",
  adolat: "Adolat yoshlar guruhi",
  xdp: "XDP yoshlar guruhi",
  ekologiya: "Ekologik partiya yoshlar guruhi",
};

const REGIONS = [
  { id: "karakalpakstan", title: "Qoraqalpog'iston Respublikasi", d: "M119 0L118 4 117 7 117 12 113 15 111 18 111 24 108 27 107 32 104 37 102 43 102 47 102 53 103 56 105 60 105 62 102 71 102 76 104 81 107 84 110 85 114 87 117 87 119 89 121 90 122 88 124 87 126 87 128 87 133 85 136 84 137 85 138 88 136 91 134 92 135 96 137 97 139 99 144 100 146 102 149 102 155 103 160 103 163 101 166 102 167 103 171 102 173 102 176 103 181 102 186 100 193 98 194 95 197 95 198 93 197 91 199 88 205 83 210 78 213 73 213 70 212 68 211 67 210 65 214 64 235 80 238 87 244 93 250 101 254 105 259 112 276 133 278 135 284 145 299 150 272 202 270 218 277 230 264 237 285 265 299 285 288 290 285 291 280 283 271 272 264 268 255 266 252 266 250 267 249 268 248 270 247 273 246 273 244 271 243 270 241 267 240 266 237 266 230 261 222 253 217 248 212 243 207 236 206 234 206 231 200 229 196 230 194 231 192 236 190 235 188 234 185 231 185 231 183 231 183 230 186 228 186 228 186 227 185 226 185 222 184 221 184 220 185 219 187 218 187 217 183 215 182 214 180 211 178 210 177 210 176 212 173 211 172 211 168 211 158 212 157 210 155 208 152 204 152 202 149 197 145 196 144 197 141 197 137 196 135 195 130 189 125 183 122 179 122 180 121 182 122 183 122 183 120 184 120 185 121 187 118 188 114 188 112 188 110 187 106 186 105 186 103 187 101 189 100 190 100 191 104 194 109 201 112 207 112 207 116 209 116 210 111 211 111 211 111 208 110 204 109 202 102 200 102 200 100 201 99 202 97 200 97 199 95 197 93 197 92 198 91 200 91 201 90 200 88 200 88 202 90 203 90 205 90 206 90 207 90 209 88 214 86 214 85 213 82 217 80 218 77 219 77 219 74 218 73 218 65 218 60 220 57 221 56 224 54 230 52 232 51 233 50 233 48 233 45 234 46 236 45 238 45 240 45 243 45 246 45 248 46 251 46 252 47 254 48 255 47 257 47 259 48 262 49 264 50 266 51 266 53 266 53 267 52 268 50 269 49 271 49 272 48 274 46 274 44 273 41 273 37 272 30 272 20 271 17 271 15 271 9 270 0 270 0 38 2 37 33 27 33 27 35 26 36 26 49 22 93 8 102 5Z" },
  { id: "xorazm", title: "Xorazm viloyati", d: "M283 312L281 309 280 308 280 304 278 301 277 299 278 298 277 293 277 291 275 288 273 287 272 286 272 285 268 280 264 277 261 275 260 274 259 273 257 274 254 272 252 272 250 274 250 277 249 279 249 280 247 281 245 281 244 281 243 281 239 279 237 277 235 277 229 275 222 276 217 276 212 276 207 277 204 274 201 272 195 268 191 266 190 265 190 263 190 259 191 256 193 254 191 252 188 245 189 242 194 241 196 243 197 243 199 244 199 243 198 241 196 240 194 239 192 237 192 236 195 231 201 229 206 230 207 231 207 234 210 242 212 243 217 248 221 252 230 260 236 265 240 266 241 267 243 269 246 273 248 273 249 271 253 266 256 266 259 266 265 268 272 272 280 280 286 291 289 290 292 293 298 300 299 301 298 306 293 311 287 319Z" },
  { id: "navoiy", title: "Navoiy viloyati", d: "M498 275L498 280 497 283 491 283 492 294 494 295 498 296 500 304 497 305 492 319 490 317 488 314 484 315 482 316 479 316 477 315 475 314 474 314 472 320 471 324 472 326 472 328 471 334 470 335 468 342 469 342 471 342 471 343 467 347 466 348 457 350 455 350 450 348 448 346 441 342 439 343 438 344 439 350 437 355 436 357 435 357 431 356 422 358 422 360 424 362 427 369 426 372 425 374 428 381 425 382 422 383 421 383 421 380 416 370 411 366 408 367 400 364 395 357 396 354 401 351 406 344 407 338 407 334 407 330 409 329 413 331 416 333 418 333 422 333 424 332 427 328 429 324 433 320 434 311 420 310 411 308 409 307 407 296 406 293 404 293 404 296 403 298 400 299 397 299 392 299 390 304 374 303 374 295 372 293 371 293 369 294 362 308 359 308 356 308 356 306 353 302 344 296 329 289 323 288 322 287 321 282 319 277 313 274 309 270 304 261 290 265 286 266 265 237 278 230 271 218 272 202 300 150 285 146 279 135 321 127 342 123 345 124 358 125 364 126 381 127 394 128 406 123 419 117 424 118 430 131 436 137 447 147 448 153 455 174 468 168 468 200 468 207 465 205 465 212 463 213 463 230 463 232 488 235 491 274Z" },
  { id: "buxoro", title: "Buxoro viloyati", d: "M421 383L414 389 409 394 411 400 393 407 387 413 385 411 382 412 378 412 374 410 365 402 358 398 354 393 351 389 345 385 340 382 336 379 331 376 321 369 314 364 300 353 298 351 297 347 296 343 296 340 295 334 294 330 292 328 290 323 287 320 292 312 297 307 298 302 292 294 288 290 299 285 286 266 290 265 308 268 311 273 314 274 317 276 321 282 322 288 324 288 329 289 343 296 353 302 355 308 362 308 367 295 372 293 373 303 390 304 396 299 402 298 404 293 406 296 408 306 411 308 426 310 434 311 432 320 428 323 423 332 415 333 413 331 410 329 407 330 407 334 405 344 401 351 396 354 394 357 398 363 407 366 411 366 416 370 420 379 421 383Z" },
  { id: "samarqand", title: "Samarqand viloyati", d: "M533 391L531 391 527 392 524 393 517 390 513 389 512 389 512 391 511 392 507 393 504 391 504 389 503 387 494 384 492 385 491 386 490 388 486 390 483 389 481 387 480 386 473 388 469 390 467 391 466 391 461 388 455 380 451 379 449 381 447 382 429 381 426 377 425 374 426 372 427 369 424 362 422 358 431 356 436 357 439 344 441 342 447 345 450 347 456 350 466 348 471 343 468 342 468 343 471 335 472 328 472 326 471 324 472 319 474 315 477 313 480 316 482 316 484 315 487 313 490 317 491 320 504 321 505 325 504 327 504 331 505 335 507 337 508 340 506 343 506 346 512 350 519 352 531 354 532 361 527 363 523 369 523 374 524 376 525 377 529 381 531 385 533 388 533 391Z" },
  { id: "qashqadaryo", title: "Qashqadaryo viloyati", d: "M421 383L423 383 427 382 428 381 429 381 446 382 448 381 451 380 451 379 455 380 458 384 461 388 462 390 465 391 466 391 469 390 480 386 482 387 485 390 486 390 490 388 491 386 492 385 494 384 503 386 504 389 504 391 504 393 510 392 512 391 512 389 519 390 524 393 527 392 528 394 530 397 531 398 533 399 534 399 537 399 537 401 540 402 540 403 540 405 540 407 541 409 540 410 535 411 533 411 533 413 533 416 534 418 535 424 533 428 531 426 529 426 527 426 525 428 516 440 515 443 514 446 512 449 510 450 506 452 495 464 493 470 494 471 491 468 489 467 486 466 483 467 480 466 477 464 473 460 472 460 468 459 467 457 465 457 464 456 462 456 461 455 458 453 457 453 454 454 454 455 453 455 448 454 438 450 430 445 425 441 418 433 411 430 406 427 397 422 394 420 389 415 388 413 393 407 411 400 411 399 410 398 409 397 409 395 413 389 418 387Z" },
  { id: "surxondaryo", title: "Surxondaryo viloyati", d: "M573 460L572 463 570 467 568 470 568 471 568 473 568 474 565 475 561 476 557 484 554 487 552 490 551 492 550 495 548 496 547 500 547 503 547 507 547 513 546 516 543 514 540 513 537 513 535 514 534 513 532 511 530 513 527 514 523 516 521 517 520 515 519 513 517 512 514 510 514 508 512 506 511 505 508 504 502 506 498 506 494 506 492 506 488 506 487 505 487 503 492 501 492 500 487 493 487 492 488 486 488 484 488 481 489 479 490 477 490 476 493 474 494 472 493 471 493 470 494 465 506 452 512 449 514 447 515 440 524 430 526 428 527 426 529 426 531 426 532 428 534 423 534 419 533 418 533 413 533 411 535 411 539 410 540 409 541 410 542 410 545 409 546 409 547 410 549 410 550 408 552 408 553 408 555 409 558 408 560 409 561 412 564 414 564 418 562 419 561 420 558 421 558 421 561 425 558 426 557 427 558 429 558 431 558 437 560 440 561 441 560 442 560 444 562 445 565 447 565 448 567 450 569 451 571 454 572 456 573 458Z" },
  { id: "jizzax", title: "Jizzax viloyati", d: "M581 375L579 376 577 378 574 378 570 378 566 377 564 377 560 376 557 376 555 375 553 374 549 373 547 373 541 371 539 372 537 374 532 376 529 379 528 381 524 377 523 374 523 370 526 364 527 363 531 362 532 361 531 354 519 352 512 350 506 346 506 343 508 341 504 335 504 331 504 327 505 325 504 321 491 320 492 319 497 305 499 304 498 297 493 296 491 294 490 283 497 283 498 280 498 275 516 277 523 277 527 277 543 278 545 279 547 282 550 285 552 283 553 285 555 283 556 284 554 285 555 290 554 291 554 296 550 296 550 299 551 301 559 305 563 309 567 310 567 313 563 314 562 319 562 319 564 319 559 332 559 335 560 337 566 337 575 336 577 335 585 334 585 334 584 341 582 341 580 343 581 343 586 344 587 344 590 343 592 343 595 342 597 341 600 341 601 342 601 346 596 346 594 347 593 348 592 348 592 352 594 356 593 358 593 357 592 355 591 351 590 352 592 355 590 359 589 361 588 361 587 360 585 359 584 359 584 362 583 365 581 366 581 367 583 370 583 371 581 374Z" },
  { id: "sirdaryo", title: "Sirdaryo viloyati", d: "M596 338L584 341 585 334 577 335 567 337 560 337 559 335 559 332 565 319 565 318 563 319 563 314 567 314 567 310 571 313 575 314 579 317 580 316 583 316 587 314 586 312 580 303 580 296 579 291 580 292 579 291 576 291 576 289 581 290 581 290 583 289 583 289 584 290 585 290 585 292 586 293 591 299 594 303 599 307 604 311 607 315 607 320 606 325 605 330 605 332 605 333 604 338 604 337 602 337 598 337Z" },
  { id: "toshkent-viloyati", title: "Toshkent viloyati", d: "M706 216L704 215 701 212 698 211 694 211 691 214 689 214 686 216 684 215 682 217 682 218 680 220 679 221 678 223 676 228 675 229 674 228 673 227 673 225 672 224 670 223 667 221 666 220 665 221 665 223 664 224 664 225 662 226 662 227 662 229 661 231 660 231 658 232 657 234 656 235 655 237 654 238 651 240 650 241 649 243 648 243 648 242 647 242 645 246 642 247 640 246 638 247 634 248 633 249 630 250 628 251 628 252 626 253 625 255 623 256 620 258 620 260 621 261 618 262 615 262 612 262 610 262 609 263 609 264 606 266 605 269 603 269 601 272 600 275 599 276 596 279 594 281 592 283 591 287 589 289 588 290 586 293 585 291 590 299 598 307 604 311 606 315 606 320 605 325 604 330 605 332 605 333 607 338 607 338 608 338 611 338 614 338 613 337 612 335 612 333 614 333 615 332 615 331 614 329 615 326 614 323 613 320 611 318 613 316 617 315 617 313 617 312 617 307 619 303 621 303 624 304 627 306 629 309 630 310 631 312 634 312 635 312 636 309 637 308 639 307 641 307 643 308 644 307 645 307 647 306 649 305 650 305 653 302 654 300 656 300 658 299 662 297 663 296 664 294 664 292 665 289 666 287 668 287 668 282 666 278 665 271 668 267 668 264 666 261 664 259 662 258 660 258 656 254 658 253 660 251 662 251 664 251 666 248 670 246 671 244 671 242 673 241 675 239 676 238 678 235 680 233 682 234 683 233 685 232 687 230 686 228 688 226 689 226 690 227 691 227 692 226 695 225 697 223 701 220 704 220 705 219Z" },
  { id: "toshkent-shahri", title: "Toshkent shahri", d: "M619 267L618 266 618 266 617 267 616 268 615 268 613 267 612 268 611 268 610 268 609 269 609 270 609 274 610 274 611 275 612 275 613 275 614 274 615 274 616 275 617 276 617 276 619 274 618 272 618 272 618 271 618 270 619 269 619 268Z" },
  { id: "namangan", title: "Namangan viloyati", d: "M749 281L749 280 746 279 744 281 741 280 737 280 735 279 734 279 734 278 733 278 734 276 735 274 736 272 737 271 735 269 734 267 733 267 733 265 730 263 729 261 729 263 728 263 728 262 727 262 727 263 727 264 726 264 726 263 727 261 727 260 727 258 726 257 724 257 724 259 722 259 722 260 724 261 725 261 725 263 724 264 724 265 724 265 724 267 723 268 720 271 715 271 714 272 715 276 715 278 714 280 712 284 712 284 711 281 711 280 709 280 709 282 707 283 706 283 707 281 706 279 704 279 704 280 703 279 701 280 701 281 698 280 696 279 692 280 691 278 690 278 688 276 686 277 685 279 684 274 683 273 683 271 683 267 681 263 679 261 678 262 676 262 670 265 668 267 665 271 666 278 669 282 669 284 669 286 669 287 670 288 672 290 674 291 674 293 676 297 677 298 678 299 680 301 681 302 681 302 680 302 679 303 683 306 684 306 684 306 689 305 692 304 699 304 699 305 697 307 698 309 706 313 707 313 710 311 711 308 713 308 717 306 720 304 723 309 724 308 728 308 730 310 734 314 743 316 746 316 750 317 750 318 750 321 750 321 748 321 746 323 745 324 744 323 744 326 742 328 738 331 737 332 737 334 739 335 739 336 737 337 737 337 735 337 732 337 731 337 731 338 730 339 728 342 727 342 726 341 725 340 725 338 724 337 722 336 721 337 721 338 721 339 720 339 717 338 716 338 716 336 715 335 713 335 712 334 711 333 710 333 709 332 707 333 707 332 704 332 704 332 704 332 703 331 701 332 699 332 696 334 692 335 692 337 692 338 689 338 685 339 683 340 677 342 676 341 675 339 675 338 674 338 674 337 674 335 674 334 674 333 674 332Z" },
  { id: "fargona", title: "Farg'ona viloyati", d: "M751 320L751 317 747 315 744 314 735 313 732 309 729 307 725 307 724 308 722 303 723 303 721 300 723 298 725 297 733 295 737 295 741 296 748 296 750 289 751 289 754 288 756 287 757 286 759 286 760 287 761 287 763 287 764 289 763 291 764 291 766 291 767 294 768 296 769 297 773 298 773 298 775 299 777 298 780 298 780 298 783 300 783 301 785 301 786 300 787 300 787 299 786 299 787 297 788 298 790 299 791 298 793 299 793 299 793 302 792 303 789 304 787 305 784 306 782 307 779 309 777 310 776 311 776 315 775 316 774 315 773 315 771 316 771 318 770 319 768 318 767 318 765 317 764 317 763 316 760 313 759 313 758 314 759 314 760 316 760 317 760 319 761 321 760 325 758 326 757 324 755 323 755 324 754 324 752 321Z" },
  { id: "andijon", title: "Andijon viloyati", d: "M674 332L674 332 673 331 669 329 667 329 664 328 663 326 663 325 663 323 664 322 666 322 667 322 668 321 671 320 670 319 671 318 672 318 673 318 673 317 675 316 677 314 678 312 680 311 681 312 681 311 681 309 682 310 683 309 683 308 684 308 684 307 689 306 692 304 699 304 699 305 697 307 698 309 700 312 706 314 707 313 710 311 712 307 713 308 717 306 720 304 723 309 724 308 728 308 730 310 734 314 743 316 746 316 750 317 750 318 750 321 750 321 748 321 746 323 745 324 744 326 742 328 738 331 737 332 737 334 739 335 739 336 737 337 735 337 732 337 730 339 728 342 726 341 725 340 724 337 722 336 721 337 721 339 720 339 717 338 716 336 714 335 712 334 711 333 709 332 707 332 704 332 703 331 701 332 699 332 696 334 692 335 692 338 689 338 685 339 683 340 681 341 676 342 676 341 675 339 675 338 674 337 674 335 674 333Z" },
];

type Tab = "viloyatlar" | "qomitalar" | "guruhlar";

interface Props {
  members: Member[];
  committees?: Committee[];
  yoshlarGuruhlari?: YoshlarGuruhi[];
  onRegionSelect?: (region: string | null) => void;
}

/* ---- Shared member list ---- */
function MemberList({ list }: { list: Member[] }) {
  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 text-center px-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
          <span className="text-2xl">👤</span>
        </div>
        <p className="text-sm text-gray-500">Hozircha a&apos;zo yo&apos;q</p>
      </div>
    );
  }
  return (
    <ul>
      {list.map((m) => (
        <li key={m.id} className="border-b border-gray-50 last:border-0">
          <Link
            href={`/yoshlar-parlamenti-azolari/${m.id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group"
          >
            {m.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.image} alt={m.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-blue-100" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[#0047AB] font-bold text-sm">
                {m.name.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 group-hover:text-[#0047AB] transition-colors line-clamp-2 leading-snug">{m.name}</p>
              {m.fraction && <p className="text-[11px] text-gray-400 mt-0.5 truncate">{m.fraction}</p>}
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0047AB] transition-colors flex-shrink-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function UzbekistanMap({
  members = [],
  committees = [],
  yoshlarGuruhlari = [],
  onRegionSelect,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("viloyatlar");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [activeCommittee, setActiveCommittee] = useState<Committee | null>(null);
  const [activeGuruh, setActiveGuruh] = useState<YoshlarGuruhi | null>(null);

  function selectRegion(title: string | null) {
    setActiveRegion(title);
    onRegionSelect?.(title);
  }

  function switchTab(tab: Tab) {
    setActiveTab(tab);
    setActiveRegion(null);
    setActiveCommittee(null);
    setActiveGuruh(null);
  }

  function getColor(r: { id: string; title: string }) {
    if (activeRegion === r.title) return "#0047AB";
    if (hoveredRegion === r.title) return "#3b82f6";
    if (getMembersForRegion(r.id, members).length > 0) return "#60a5fa";
    return "#93c5fd";
  }

  const activeId = activeRegion ? REGIONS.find((r) => r.title === activeRegion)?.id ?? null : null;
  const regionMembers = activeId ? getMembersForRegion(activeId, members) : [];

  const stats = REGIONS.map((r) => ({
    id: r.id,
    name: r.title,
    count: getMembersForRegion(r.id, members).length,
  })).sort((a, b) => b.count - a.count);

  /* Committee members */
  const committeeMembers = activeCommittee
    ? members.filter((m) => m.committee === activeCommittee.name)
    : [];

  /* Guruh members — match by yoshlarGuruhi field using short name key */
  const guruhMembers = activeGuruh
    ? members.filter((m) => m.yoshlarGuruhi === YOSHLAR_GURUHI_KEYS[activeGuruh.key])
    : [];

  const TABS: { key: Tab; label: string }[] = [
    { key: "viloyatlar", label: "Viloyatlar bo'yicha" },
    { key: "qomitalar",  label: "Qo'mitalar bo'yicha" },
    { key: "guruhlar",   label: "Yoshlar guruhlari bo'yicha" },
  ];

  /* ---- sidebar content ---- */
  const sidebarSelected = activeCommittee || activeGuruh || activeRegion;
  const sidebarCount =
    activeCommittee ? committeeMembers.length :
    activeGuruh ? guruhMembers.length :
    activeRegion ? regionMembers.length : 0;
  const sidebarLabel =
    activeCommittee ? activeCommittee.name :
    activeGuruh ? activeGuruh.name :
    activeRegion ?? "";
  const sidebarMembers =
    activeCommittee ? committeeMembers :
    activeGuruh ? guruhMembers :
    regionMembers;

  return (
    <div className="w-full">
      {/* ===== TABS ===== */}
      <div className="flex flex-wrap gap-1 mb-5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => switchTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeTab === t.key
                ? "bg-[#0047AB] text-white border-[#0047AB]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#0047AB] hover:text-[#0047AB]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* ===== LEFT / MAIN PANEL ===== */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-full">

            {/* --- VILOYATLAR TAB: SVG map --- */}
            {activeTab === "viloyatlar" && (
              <>
                <p className="text-sm text-gray-400 mb-3">
                  {activeRegion
                    ? <span className="text-[#0047AB] font-semibold">{activeRegion}</span>
                    : "Viloyatni bosib a'zolarni ko'ring"}
                </p>
                <div className="w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <svg viewBox="0 0 793 517" className="w-full h-auto min-h-[300px] md:min-h-[400px] block drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                    {REGIONS.map((r) => (
                      <path
                        key={r.id}
                        id={r.id}
                        d={r.d}
                        fill={getColor(r)}
                        stroke="white"
                        strokeWidth={1.5}
                        style={{ cursor: "pointer", transition: "fill 0.15s" }}
                        onClick={() => selectRegion(activeRegion === r.title ? null : r.title)}
                        onMouseEnter={() => setHoveredRegion(r.title)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      >
                        <title>{r.title}</title>
                      </path>
                    ))}
                  </svg>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5"><span className="w-4 h-3 rounded inline-block" style={{ background: "#93c5fd" }} />A&apos;zo yo&apos;q</span>
                  <span className="flex items-center gap-1.5"><span className="w-4 h-3 rounded inline-block" style={{ background: "#60a5fa" }} />A&apos;zolar bor</span>
                  <span className="flex items-center gap-1.5"><span className="w-4 h-3 rounded inline-block" style={{ background: "#0047AB" }} />Tanlangan</span>
                </div>
              </>
            )}

            {/* --- QOMITALAR TAB --- */}
            {activeTab === "qomitalar" && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {committees.length === 0 && (
                  <li className="col-span-2 text-center py-10 text-gray-400 text-sm">Qo'mitalar topilmadi</li>
                )}
                {committees.map((c) => {
                  const count = members.filter((m) => m.committee === c.name).length;
                  const isActive = activeCommittee?.id === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setActiveCommittee(isActive ? null : c)}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition flex items-center gap-3 ${
                          isActive
                            ? "border-[#0047AB] bg-blue-50"
                            : "border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50/50"
                        }`}
                      >
                        {c.image ? (
                          <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden border border-gray-200 bg-white">
                            <Image src={c.image} alt={c.name} fill className="object-contain p-0.5" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center flex-shrink-0 text-[#0047AB] font-bold text-sm">
                            {c.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold leading-snug line-clamp-2 ${isActive ? "text-[#0047AB]" : "text-gray-700"}`}>{c.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{count} ta a&apos;zo</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#0047AB]" : "text-gray-300"}`} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* --- YOSHLAR GURUHLARI TAB --- */}
            {activeTab === "guruhlar" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {yoshlarGuruhlari.length === 0 && (
                  <div className="col-span-5 text-center py-10 text-gray-400 text-sm">Ma'lumot topilmadi</div>
                )}
                {yoshlarGuruhlari.map((g) => {
                  const count = members.filter((m) => m.yoshlarGuruhi === YOSHLAR_GURUHI_KEYS[g.key]).length;
                  const isActive = activeGuruh?.id === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setActiveGuruh(isActive ? null : g)}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 transition ${
                        isActive
                          ? "border-[#0047AB] bg-blue-50 shadow"
                          : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"
                      }`}
                    >
                      <div className="relative w-16 h-12 mb-2">
                        <Image src={g.image} alt={g.name} fill className="object-contain" />
                      </div>
                      <p className={`text-[11px] font-medium text-center leading-snug line-clamp-3 ${isActive ? "text-[#0047AB]" : "text-gray-700"}`}>{g.name}</p>
                      <span className={`mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        count > 0 ? "bg-blue-100 text-[#0047AB]" : "bg-gray-100 text-gray-400"
                      }`}>{count} ta</span>
                    </button>
                  );
                })}
              </div>
            )}

          </div>
        </div>

        {/* ===== O'NG PANEL ===== */}
        <div className="xl:w-72 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col" style={{ height: 500 }}>
            {/* Panel header */}
            <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0 flex items-center justify-between">
              {sidebarSelected ? (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0047AB] leading-tight line-clamp-2">{sidebarLabel}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sidebarCount} ta a&apos;zo</p>
                  </div>
                  <button
                    onClick={() => { setActiveRegion(null); setActiveCommittee(null); setActiveGuruh(null); }}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0047AB] transition ml-2 flex-shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Orqaga
                  </button>
                </>
              ) : (
                <p className="text-sm font-semibold text-gray-700">
                  {activeTab === "viloyatlar" ? "Viloyatlar bo'yicha" :
                   activeTab === "qomitalar"  ? "Qo'mitalar bo'yicha" :
                   "Yoshlar guruhlari bo'yicha"}
                </p>
              )}
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">
              {activeTab === "viloyatlar" && !activeRegion ? (
                <ul>
                  {stats.map((r) => (
                    <li key={r.name}>
                      <button
                        onClick={() => selectRegion(r.name)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-blue-50 border-b border-gray-50 text-gray-700"
                      >
                        <span className="truncate pr-2">{r.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${r.count > 0 ? "bg-blue-100 text-[#0047AB]" : "bg-gray-100 text-gray-400"}`}>{r.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : activeTab === "qomitalar" && !activeCommittee ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center px-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <span className="text-2xl">📋</span>
                  </div>
                  <p className="text-sm text-gray-500">Qo&apos;mitani tanlang</p>
                </div>
              ) : activeTab === "guruhlar" && !activeGuruh ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center px-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <p className="text-sm text-gray-500">Yoshlar guruhini tanlang</p>
                </div>
              ) : (
                <MemberList list={sidebarMembers} />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
