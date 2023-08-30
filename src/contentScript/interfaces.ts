export interface Ticket {
  TicketID: number;
  TicketGroupID: number;
  PurchaseOrderID: number;
  SeatNumber: number;
  SeatOrder: number;
  ActualSoldPrice: number;
  OnHand: boolean;
  OnHandDate: string;
  InvoiceID: number | null;
  Available: boolean;
  Cost: number;
}

export interface TicketGroup {
  TicketGroupID: number;
  ExchangeTicketGroupID: number;
  UploadTicketGroupID: number | null;
  CreateDate: string;
  EventID: number;
  PosEventID: number;
  EventName: string;
  EventDateAndTime: string;
  VenueID: number;
  VenueName: string;
  VenueCity: string;
  VenueState: string;
  UpdatedByCSRID: number;
  TicketGroupCodeID: number | null;
  ExposureTypeID: number;
  SeatingTypeID: number;
  StockTypeID: number;
  TicketGroupTypeID: number;
  SplitRuleID: number;
  ShippingMethodSpecialID: number;
  NearTermDisplayOptionID: number;
  BroadcastChannelIDs: string;
  Section: string;
  Row: string;
  OfficeID: number;
  ETicketsAttachedDate: string | null;
  InstantDownload: boolean;
  InternalNotes: string;
  ExternalNotes: string;
  FacePrice: number;
  RetailPrice: number;
  WholesalePrice: number;
  BarcodesAttachedDate: string | null;
  UpdateDate: string;
  PricingNotes: string;
  TaxedCost: number;
  MSRP: number;
  Tags: any[];
  Tickets: Ticket[];
}

export interface TicketGroupsData {
  TicketGroups: TicketGroup[];
}
