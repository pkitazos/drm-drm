const hello = {
    // Id:           Int  @id,
    first_name:   String,
    last_name:    String,
    email:        String,
    phone_number: String,
    // avatar:       String,
    // address:      Address @relation(fields: [addressId], references: [id],)
    /// @zod.optional()
    loyaltyLevel: Int     @default(0),
    // addressId:    String,
    // Order:        Order[],
}