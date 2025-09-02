"""change the data type of note column in medical info table

Revision ID: b3c73c2bf9e8
Revises: 2cc82fde9cdf
Create Date: 2025-08-27 18:46:45.236807
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'b3c73c2bf9e8'
down_revision: Union[str, Sequence[str], None] = '2cc82fde9cdf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Example: dropping and recreating foreign keys (kept from your original migration)
    op.drop_constraint(op.f('appointments_treatmentId_fkey'), 'appointments', type_='foreignkey')
    op.drop_constraint(op.f('appointments_doctorId_fkey'), 'appointments', type_='foreignkey')
    op.drop_constraint(op.f('appointments_patientId_fkey'), 'appointments', type_='foreignkey')
    op.create_foreign_key(None, 'appointments', 'patients', ['patientId'], ['id'], source_schema='public', referent_schema='public', ondelete='CASCADE')
    op.create_foreign_key(None, 'appointments', 'doctors', ['doctorId'], ['id'], source_schema='public', referent_schema='public', ondelete='CASCADE')
    op.create_foreign_key(None, 'appointments', 'treatments', ['treatmentId'], ['id'], source_schema='public', referent_schema='public', ondelete='CASCADE')

    # ... repeat other foreign key changes here if needed ...

    # Alter notes column to JSONB
    op.alter_column(
        'patient_medical_info',
        'notes',
        existing_type=sa.TEXT(),
        type_=postgresql.JSONB(),
        postgresql_using='notes::jsonb',  # explicit cast
        existing_nullable=True
    )

    # Recreate foreign keys for patient_medical_info
    op.drop_constraint(op.f('patient_medical_info_patientId_fkey'), 'patient_medical_info', type_='foreignkey')
    op.drop_constraint(op.f('patient_medical_info_appointmentId_fkey'), 'patient_medical_info', type_='foreignkey')
    op.create_foreign_key(None, 'patient_medical_info', 'patients', ['patientId'], ['id'], source_schema='public', referent_schema='public', ondelete='CASCADE')
    op.create_foreign_key(None, 'patient_medical_info', 'appointments', ['appointmentId'], ['id'], source_schema='public', referent_schema='public', ondelete='CASCADE')


def downgrade() -> None:
    """Downgrade schema."""
    # Revert notes column back to TEXT
    op.alter_column(
        'patient_medical_info',
        'notes',
        existing_type=postgresql.JSONB(),
        type_=sa.TEXT(),
        existing_nullable=True
    )

    # You can optionally revert foreign keys here as needed
