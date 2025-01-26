use anchor_lang::prelude::*;

declare_id!("BZ46sZ2iejuwJjZ7Ga4P7B8y7EDXmAWpKjHAAowufAg8");

#[program]
pub mod mailfromfuture {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let mail = &mut ctx.accounts.mail;
        mail.bump = ctx.bumps.mail;
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create(ctx: Context<Create>, text: String, unlock_after: u16) -> Result<()> {
        let mail = &mut ctx.accounts.mail;
        mail.text = text;
        mail.unlock_after = unlock_after;
        mail.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(init, seeds = [b"counter"], bump, payer = user, space = 8 + Mail::INIT_SPACE)]
    pub mail: Account<'info, Mail>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(mut, 
        seeds = [b"counter"],
        bump = mail.bump
        )]
    pub mail: Account<'info, Mail>,
}

#[account]
#[derive(InitSpace)]
pub struct Mail {
    #[max_len(250)]
    pub text: String,
    pub unlock_after: u16,
    pub created_at: i64,
    pub bump: u8,
}
