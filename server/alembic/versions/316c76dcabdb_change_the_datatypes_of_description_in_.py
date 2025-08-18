"""Change the datatypes of description in the treatment model

Revision ID: 316c76dcabdb
Revises: d381a9d2f6aa
Create Date: 2025-08-13 17:18:39.197297

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '316c76dcabdb'
down_revision: Union[str, Sequence[str], None] = 'd381a9d2f6aa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1️⃣ Add appointmentId to patient_medical_info
    op.add_column(
        'patient_medical_info',
        sa.Column('appointmentId', sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        'fk_patient_medical_info_appointment',
        'patient_medical_info', 'appointments',
        ['appointmentId'], ['id']
    )

    # 2️⃣ Change treatments.description type to Text
    op.alter_column(
        'treatments',
        'description',
        existing_type=sa.JSON(),  # adjust if your current type is String
        type_=sa.Text(),
        existing_nullable=True
    )

def downgrade() -> None:
    # 2️⃣ Revert treatments.description back to JSON (or String if applicable)
    op.alter_column(
        'treatments',
        'description',
        existing_type=sa.Text(),
        type_=sa.JSON(),  # or sa.String()
        existing_nullable=True
    )

    # 1️⃣ Remove appointmentId column
    op.drop_constraint(
        'fk_patient_medical_info_appointment',
        'patient_medical_info',
        type_='foreignkey'
    )
    op.drop_column('patient_medical_info', 'appointmentId')
