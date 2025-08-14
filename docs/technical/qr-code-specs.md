# QR Code Specifications

## QR Code Design

### Visual Specifications
- **Size**: Minimum 2x2 inches when printed
- **Error Correction**: Level H (30% recovery)
- **Format**: SVG for scalability, PNG for raster
- **Colors**: High contrast (dark on light background)
- **Quiet Zone**: Minimum 4 modules around code

### Data Structure
```json
{
  "version": "1.0",
  "pet_id": "uuid",
  "token": "secure_random_token",
  "emergency_info": {
    "pet_name": "string",
    "species": "string",
    "emergency_contact": "phone_number",
    "critical_conditions": ["array_of_conditions"]
  },
  "expires_at": "timestamp",
  "checksum": "data_integrity_hash"
}
```

## Security Features

### Token Generation
- Cryptographically secure random tokens
- 32-character alphanumeric strings
- Unique per pet and rotation cycle
- Signed with HMAC for integrity

### Access Levels
1. **Public Level**: Pet name, species, emergency contact
2. **Veterinarian Level**: Full medical history (requires auth)
3. **Owner Level**: Complete pet profile and controls

### Scanning Workflow
1. QR code scanned by any user
2. Token validated and decoded
3. Emergency info displayed immediately
4. Full access requires authentication
5. Access attempt logged

## Implementation Details

### QR Code Generation
- Server-side generation with secure libraries
- Batch generation for offline use
- Regular token rotation (monthly)
- Backup QR codes for emergencies

### Mobile Integration
- Native camera integration
- QR code detection and decoding
- Offline QR code display for pet owners
- Quick scan from lock screen (emergency mode)

## Physical Implementation

### ID Tags
- Durable materials (metal or weather-resistant plastic)
- QR code laser engraved or UV printed
- Contact information backup
- Clear instructions for scanning

### Emergency Stickers
- Waterproof adhesive backing
- High-visibility colors
- Multiple sizes available
- Instructions in multiple languages

## Fallback Mechanisms
- Manual ID number entry
- Phone number lookup system
- Microchip integration
- Emergency vet contact network
- Offline emergency information card